# How To Install and Set Up Laravel with Docker Compose on Ubuntu 22.04

To _containerize_ an application refers to the process of adapting an application and its components in order to be able to run it in lightweight environments known as [containers](https://www.docker.com/resources/what-container). Such environments are isolated and disposable, and can be leveraged for developing, testing, and deploying applications to production.
In this guide, we’ll use [Docker Compose](https://docs.docker.com/compose/) to containerize a [Laravel](https://laravel.com/) application for development. When you’re finished, you’ll have a demo Laravel application running on three separate service containers:
-   An  `backend`  service running PHP8.1-FPM;
-   A  `db`  service running PostgreSQL 12.8;
-   An  `nginx`  service that uses the  `backend`  service to parse PHP code before serving the Laravel application to the final user.
 
To allow for a streamlined development process and facilitate application debugging, we’ll keep application files in sync by using shared volumes. We’ll also see how to use `docker-compose exec` commands to run [Composer](https://getcomposer.org/) and [Artisan](https://laravel.com/docs/6.x/artisan) on the `backend` container.

# Prerequisites

-   Access to an Ubuntu 22.04 local machine or development server as a non-root user with sudo privileges. If you’re using a remote server, it’s advisable to have an active firewall installed. To set these up, please refer to our  [Initial Server Setup Guide for Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-22-04).
-   Docker installed on your server, following Steps 1 and 2 of  [How To Install and Use Docker on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04).
-   Docker Compose installed on your server, following Step 1 of  [How To Install and Use Docker Compose on Ubuntu 22.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-22-04).

### Step 1 — Obtaining the Demo Application
To get started, we’ll fetch the Laravel application from its [Gitlab repository](https://gitlab.com/jonathanGR3450/laravel-react-base). We’re interested in the `master` branch.
To obtain the application code that is compatible with this tutorial, download repository to your home directory with:
```bash
cd ~
git clone https://gitlab.com/jonathanGR3450/laravel-react-base.git
```
Navigate to the `laravel-react-base` directory:
```bash
cd laravel-react-base
```
In the next step, we’ll create a `.env` configuration file to set up the application.

### Step 2 — Setting Up the Application’s  `.env`  File
The Laravel configuration files are located in a directory called `config`, inside the application’s root directory. Additionally, a `.env` file is used to set up [environment-dependent configuration](https://12factor.net/config), such as credentials and any information that might vary between deploys. This file is not included in revision control.

The values contained in the  `.env`  file will take precedence over the values set in regular configuration files located at the  `config`  directory. Each installation on a new environment requires a tailored environment file to define things such as database connection settings, debug options, application URL, among other items that may vary depending on which environment the application is running.

We’ll now create a new  `.env`  file to customize the configuration options for the development environment we’re setting up. Laravel comes with an example`.env`  file that we can copy to create our own:
```bash
cp .env.example .env
nano .env
```
The current `.env` file from the `laravel-react-base` demo application contains settings to use a local PostgreSQL database, with `127.0.0.1` as database host. We need to update the `DB_HOST` variable so that it points to the database service we will create in our Docker environment. In this guide, we’ll call our database service `db`. Go ahead and replace the listed value of `DB_HOST` with the database service name:

```bash
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=fusa
DB_USERNAME=postgres
DB_PASSWORD=secret
```
Feel free to also change the database name, username, and password, if you wish. These variables will be leveraged in a later step where we’ll set up the  `docker-compose.dev.yml`  file to configure our services.

Save the file when you’re done editing. If you used  `nano`, you can do that by pressing  `Ctrl+x`, then  `Y`  and  `Enter`  to confirm.

### Step 3 — Setting Up the Application’s Dockerfile
Although both our PostgreSQL and Nginx services will be based on default images obtained from the  [Docker Hub](https://hub.docker.com/), we still need to build a custom image for the application container. We’ll create a new Dockerfile for that.

Our  **laravel-react-base**  image will be based on the  `php:8.1-fpm`  [official PHP image](https://hub.docker.com/_/php)  from Docker Hub. On top of that basic PHP-FPM environment, we’ll install a few extra PHP modules and the  [Composer](https://getcomposer.org/)  dependency management tool.

We’ll also create a new system user; this is necessary to execute  `artisan`  and  `composer`  commands while developing the application. The  `uid`  setting ensures that the user inside the container has the same uid as your system user on your host machine, where you’re running Docker. This way, any files created by these commands are replicated in the host with the correct permissions. This also means that you’ll be able to use your code editor of choice in the host machine to develop the application that is running inside containers.

Create a new Dockerfile with:
```bash
nano Dockerfile
```
Copy the following contents to your Dockerfile:
```bash
FROM php:8.1.0-fpm

# Arguments defined in docker-compose.dev.yml
ARG user
ARG uid

# copy composer.lock y composer.json a la carpeta /var/www/
COPY composer.* /var/www/

# work directory
WORKDIR /var/www

# fix permissions
RUN chown -R 1000:1000 .

# Install dependencies
RUN apt-get update && pecl install redis && apt-get install -y  --no-install-recommends \
    libzip-dev \
    libonig-dev \
    libpq-dev \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl

# clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# install extensions
RUN docker-php-ext-install pdo pdo_pgsql zip exif pcntl
RUN docker-php-ext-configure gd --with-jpeg=/usr/include/ --with-freetype=/usr/include/
RUN docker-php-ext-install gd
RUN docker-php-ext-enable redis

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

# copy the code at folder with user permissions
COPY --chown=$user:$user . /var/www

USER $user

# expose 9000 port
EXPOSE 9000

# execute php-fpm command, php-fpm run php server
CMD ["php-fpm" ]
```
Don’t forget to save the file when you’re done.

Our Dockerfile starts by defining the base image we’re using:  `php:8.1-fpm`.

After installing system packages and PHP extensions, we install Composer by copying the  `composer`  executable from its latest  [official image](https://hub.docker.com/_/composer)  to our own application image.

A new system user is then created and set up using the  `user`  and  `uid`  arguments that were declared at the beginning of the Dockerfile. These values will be injected by Docker Compose at build time.

Finally, we set the default working dir as  `/var/www`  and change to the newly created user. This will make sure you’re connecting as a regular user, and that you’re on the right directory, when running  `composer`  and  `artisan`  commands on the application container.

### Step 4 — Setting Up Nginx Configuration and Database Dump Files
When creating development environments with Docker Compose, it is often necessary to share configuration or initialization files with service containers, in order to set up or bootstrap those services. This practice facilitates making changes to configuration files to fine-tune your environment while you’re developing the application.

We’ll now set up a folder with files that will be used to configure and initialize our service containers.

To set up Nginx, we’ll share a  `app.conf`  file that will configure how the application is served. Create the  `nginx/conf.d`  folder with:
```bash
mkdir -p nginx/conf.d
```
Open a new file named `travellist.conf` within that directory
```bash
nano nginx/conf.d/app.conf
```
Copy the following Nginx configuration to that file:
```bash
server {
    listen 80;
    index index.php index.html;
    error_log  /var/log/nginx/error.log;
    access_log /var/log/nginx/access.log;
    root /var/www/public;
    location ~ \.php$ {
        try_files $uri =404;
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass backend:9000;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO $fastcgi_path_info;
    }
    location / {
        try_files $uri $uri/ /index.php?$query_string;
        gzip_static on;
    }
}
```
This file will configure Nginx to listen on port  `80`  and use  `index.php`  as default index page. It will set the document root to  `/var/www/public`, and then configure Nginx to use the  `backend`  service on port  `9000`  to process  `*.php`  files.

Save and close the file when you’re done editing.

### Step 5 — Creating a Multi-Container Environment with Docker Compose\

Docker Compose enables you to create multi-container environments for applications running on Docker. It uses  _service definitions_  to build fully customizable environments with multiple containers that can share networks and data volumes. This allows for a seamless integration between application components.

To set up our service definitions, we’ll create a new file called  `docker-compose.dev.yml`. Typically, this file is located at the root of the application folder, and it defines your containerized environment, including the base images you will use to build your containers, and how your services will interact.

We’ll define three different services in our  `docker-compose.dev.yml`  file:  `backend`,  `db`, and  `webserver`.

The  `backend`  service will build an image called  `backend`, based on the Dockerfile we’ve previously created. The container defined by this service will run a  `php-fpm`  server to parse PHP code and send the results back to the  `webserver`  service, which will be running on a separate container. The  `PostgreSQL`  service defines a container running a PostgreSQL 12.8 server. Our services will share a  [bridge network](https://docs.docker.com/network/bridge/)  named  `app-network`.

The application files will be synchronized on both the  `backend`  and the  `webserver`  services via  **bind mounts**.  [Bind mounts](https://docs.docker.com/storage/bind-mounts)  are useful in development environments because they allow for a performant two-way sync between host machine and containers.

Create a new  `docker-compose.dev.yml`  file at the root of the application folder:
```bash
nano docker-compose.dev.yml
```
A typical  `docker-compose.dev.yml`  file starts with a version definition, followed by a  `services`  node, under which all services are defined. Shared networks are usually defined at the bottom of that file.

To get started, copy this boilerplate code into your  `docker-compose.dev.yml`  file:
```bash
version: '3'
services:

networks:
  app-network:
    driver: bridge
```
We’ll now edit the `services` node to include the `backend`, `db` and `webserver` services.

#### The  `backend`  Service
The  `backend`  service will set up a container named  `backend`. It builds a new Docker image based on a Dockerfile located in the same path as the  `docker-compose.dev.yml`  file. The new image will be saved locally under the name  `www`.

Even though the document root being served as the application is located in the  `webserver`  container, we need the application files somewhere inside the  `backend`  container as well, so we’re able to execute command line tasks with the Laravel Artisan tool.

Copy the following service definition under your  `services`  node, inside the  `docker-compose.dev.yml`  file:
```bash
backend:
    build:
      args:
          user: www
          uid: 1000
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: web-fusa
    restart: unless-stopped
    working_dir: /var/www
    volumes:
      - ./backend:/var/www
      - ./backend/php/local.ini:/usr/local/etc/php/conf.d/local.ini
    environment:
      - SERVICE_NAME=web-fusa
      - SERVICE_TAGS=dev
    networks:
      - fusa-network
```
These settings do the following:

-   `build`: This configuration tells Docker Compose to build a local image for the  `backend`  service, using the specified path (context) and Dockerfile for instructions. The arguments  `user`  and  `uid`  are injected into the Dockerfile to customize user creation commands at build time.
-   `image`: The name that will be used for the image being built.
-   `container_name`: Sets up the container name for this service.
-   `restart`: Always restart, unless the service is stopped.
-   `working_dir`: Sets the default directory for this service as  `/var/www`.
-   `volumes`: Creates a shared volume that will synchronize contents from the current directory to  `/var/www`  inside the container. Notice that this is not your document root, since that will live in the  `webserver`  container. Volume `php/local.ini` to add configurations to php.
-   `networks`: Sets up this service to use a network named  `app-network`.

#### The  `db`  Service

The  `db`  service uses a pre-built  [postgis 12.3 image](https://hub.docker.com/_/postgres)  from Docker Hub. Because Docker Compose automatically loads  `.env`  variable files located in the same directory as the  `docker-compose.dev.yml`  file, we can obtain our database settings from the Laravel  `.env`  file we created in a previous step.

Include the following service definition in your  `services`  node, right after the  `backend`  service:
```bash
db:
    image: postgis/postgis:12-3.1
    container_name: db-fusa
    restart: unless-stopped
    tty: true
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_DATABASE}
    volumes:
      - pgdata-fusa-dev:/var/lib/postgresql/data
    networks:
      - fusa-network
```
These settings do the following:

-   `image`: Defines the Docker image that should be used for this container. In this case, we’re using a PostgreSQL 12.8 image from Docker Hub.
-   `container_name`: Sets up the container name for this service:  `db`.
-   `restart`: Always restart this service, unless it is explicitly stopped.
-   `environment`: Defines environment variables in the new container. We’re using values obtained from the Laravel  `.env`  file to set up our PostgreSQL service, which will automatically create a new database and user based on the provided environment variables.
-   `volumes`: Persist a database data in pgdata volume
-   `networks`: Sets up this service to use a network named  `app-network`.

#### The  `webserver`  Service

The  `webserver`  service uses a pre-built  [Nginx image](https://hub.docker.com/_/nginx)  on top of  [Alpine](https://wiki.alpinelinux.org/wiki/Main_Page), a lightweight Linux distribution. It creates a container named  `webserver`, and it uses the  `ports`  definition to create a redirection from port  `80`  on the host system to port  `80`  inside the container.

Include the following service definition in your  `services`  node, right after the  `db`  service:
```bash
webserver:
    image: nginx:alpine
    container_name: webserver-fusa
    restart: unless-stopped
    tty: true
    ports:
      - "80:80"
    volumes:
      - ./backend:/var/www
      - ./backend/nginx/conf.d/:/etc/nginx/conf.d/
    networks:
      - fusa-network
```
These settings do the following:

-   `image`: Defines the Docker image that should be used for this container. In this case, we’re using the Alpine Nginx image.
-   `container_name`: Sets up the container name for this service:  **webserver**.
-   `restart`: Always restart this service, unless it is explicitly stopped.
-   `ports`: Sets up a port redirection that will allow external access via port  `80`  to the web server running on port  `80`  inside the container.
-   `volumes`: Creates  **two**  shared volumes. The first one will synchronize contents from the current directory to  `/var/www`  inside the container. This way, when you make local changes to the application files, they will be quickly reflected in the application being served by Nginx inside the container. The second volume will make sure our Nginx configuration file, located at  `nginx/conf.d/app.conf`, is copied to the container’s Nginx configuration folder.
-   `networks`: Sets up this service to use a network named  `app-network`.

#### Finished  `docker-compose.dev.yml`  File

This is how our finished  `docker-compose.dev.yml`  file looks like:

```bash
version: '3'
services:

  #php service
  backend:
    build:
      args:
          user: www
          uid: 1000
      context: ./backend
      dockerfile: Dockerfile.dev
    container_name: web-fusa
    restart: unless-stopped
    working_dir: /var/www
    volumes:
      - ./backend:/var/www
      - ./backend/php/local.ini:/usr/local/etc/php/conf.d/local.ini
    environment:
      - SERVICE_NAME=web-fusa
      - SERVICE_TAGS=dev
    networks:
      - fusa-network
  
  #Nginx Service
  webserver:
    image: nginx:alpine
    container_name: webserver-fusa
    restart: unless-stopped
    tty: true
    ports:
      - "80:80"
    volumes:
      - ./backend:/var/www
      - ./backend/nginx/conf.d/:/etc/nginx/conf.d/
    networks:
      - fusa-network

  db:
    image: postgis/postgis:12-3.1
    container_name: db-fusa
    restart: unless-stopped
    tty: true
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_DATABASE}
    volumes:
      - pgdata-fusa-dev:/var/lib/postgresql/data
    networks:
      - fusa-network

  frontend:
    build:
      context: ./front
      dockerfile: Dockerfile.dev
    ports:
      - 5173:5173
    container_name: front-fusa
    restart: unless-stopped
    volumes:
       - ./front:/app
       - ./front/node_modules:/app/node_modules
    networks:
      - fusa-network

#Docker Networks
networks:
  fusa-network:
    driver: bridge

#Volumes
volumes:
  pgdata-fusa-dev:
    driver: local
```
Make sure you save the file when you’re done.

### Step 6 — Running the Application with Docker Compose

We’ll now use  `docker-compose`  commands to build the application image and run the services we specified in our setup.

Build the  `backend`  image with the following command:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml build backend
```
This command might take a few minutes to complete. You’ll see output similar to this:
```bash
Building app
Step 1/19 : FROM php:8.1.0-fpm
 ---> ce4c0139f920
Step 2/19 : ARG user
 ---> Using cache
 ---> 97e07732e655
Step 3/19 : ARG uid
 ---> Using cache
 ---> d7da3e5b45ba
Step 4/19 : COPY composer.* /var/www/
 ---> Using cache
 ---> 763d344a879e
Step 5/19 : WORKDIR /var/www
 ---> Using cache
 ---> 13efa96ba7ef
Step 6/19 : RUN chown -R 1000:1000 .
 ---> Using cache
 ---> 33e6cef49824
Step 7/19 : RUN apt-get update && pecl install redis && apt-get install -y  --no-install-recommends     libzip-dev     libonig-dev     libpq-dev     build-essential     libpng-dev     libjpeg62-turbo-dev     libfreetype6-dev     locales     zip     jpegoptim optipng pngquant gifsicle     vim     unzip     git     curl
 ---> Using cache
 ---> 99cf0e71dcc1
Step 8/19 : RUN apt-get clean && rm -rf /var/lib/apt/lists/*
 ---> Using cache
 ---> abf325743738
Step 9/19 : RUN docker-php-ext-install pdo pdo_pgsql zip exif pcntl
 ---> Using cache
 ---> 824a2cf709b2
Step 10/19 : RUN docker-php-ext-configure gd --with-jpeg=/usr/include/ --with-freetype=/usr/include/
 ---> Using cache
 ---> 7d89a1e29151
Step 11/19 : RUN docker-php-ext-install gd
 ---> Using cache
 ---> cd8dd9f0d4f1
Step 12/19 : RUN docker-php-ext-enable redis
 ---> Using cache
 ---> b9dac0d2a2e7
Step 13/19 : RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
 ---> Using cache
 ---> 20018fb6fb47
Step 14/19 : RUN useradd -G www-data,root -u $uid -d /home/$user $user
 ---> Using cache
 ---> 9a22660f2083
Step 15/19 : RUN mkdir -p /home/$user/.composer &&     chown -R $user:$user /home/$user
 ---> Using cache
 ---> aeaf3b3541a3
Step 16/19 : COPY --chown=$user:$user . /var/www
 ---> 3b3e5c0c1dc5
Step 17/19 : USER $user
 ---> Running in 0dd4dcd7b2f2
Removing intermediate container 0dd4dcd7b2f2
 ---> a518bb4e581d
Step 18/19 : EXPOSE 9000
 ---> Running in b5548985255d
Removing intermediate container b5548985255d
 ---> e8e1fef28e80
Step 19/19 : CMD [ "php-fpm" ]
 ---> Running in 943407d954e8
Removing intermediate container 943407d954e8
 ---> f2b1bdaa97fe
Successfully built f2b1bdaa97fe
Successfully tagged laravel-react-base_app:latest
```

When the build is finished, you can run the environment in background mode with:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml up -d
```
```bash
Creating network "laravel-react-base_fusa-network" with driver "bridge"
Creating web-fusa       ... done
Creating front-fusa     ... done
Creating db-fusa        ... done
Creating webserver-fusa ... done
```
This will run your containers in the background. To show information about the state of your active services, run:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml ps
```
You’ll see output like this:
```bash
db-fusa          docker-entrypoint.sh postgres    Up      0.0.0.0:5432->5432/tcp,:::5432->5432/tcp
front-fusa       docker-entrypoint.sh npm r ...   Up      0.0.0.0:5173->5173/tcp,:::5173->5173/tcp
web-fusa         docker-php-entrypoint php-fpm    Up      9000/tcp
webserver-fusa   /docker-entrypoint.sh ngin ...   Up      0.0.0.0:80->80/tcp,:::80->80/tcp
```
Your environment is now up and running, but we still need to execute a couple commands to finish setting up the application. You can use the `docker-compose --env-file backend/.env  -f docker-compose.dev.yml exec` command to execute commands in the service containers, such as an `ls -l` to show detailed information about files in the application directory:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml exec backend ls -l
```
```bash
total 364
-rwxrwxrwx 1 www www   1471 Aug 24 04:46 Dockerfile.dev 
-rwxrwxrwx 1 www www   1471 Aug 24 04:46 Dockerfile.prod
-rwxrwxrwx 1 www www   4158 Aug 10 07:19 README.md      
drwxrwxrwx 1 www www   4096 Aug 10 07:19 app
-rwxrwxrwx 1 www www   1686 Aug 10 07:19 artisan        
drwxrwxrwx 1 www www   4096 Aug 10 07:19 bootstrap      
-rwxrwxrwx 1 www www   1932 Aug 29 21:02 composer.json  
-rwxrwxrwx 1 www www 308833 Aug 29 21:02 composer.lock  
drwxrwxrwx 1 www www   4096 Aug 29 21:03 config
drwxrwxrwx 1 www www   4096 Aug 10 07:19 database       
-rwxrwxrwx 1 www www  28875 Sep 11 06:43 deploy.dev.md  
drwxrwxrwx 1 www www   4096 Aug 29 20:45 nginx
-rwxrwxrwx 1 www www    248 Aug 10 07:19 package.json
drwxrwxrwx 1 www www   4096 Aug 29 20:21 php
-rwxrwxrwx 1 www www   1084 Aug 10 07:19 phpunit.xml
drwxrwxrwx 1 www www   4096 Aug 10 07:19 public
drwxrwxrwx 1 www www   4096 Aug 10 07:19 resources
drwxrwxrwx 1 www www   4096 Aug 10 07:19 routes
drwxrwxrwx 1 www www   4096 Aug 10 07:19 storage
drwxrwxrwx 1 www www   4096 Aug 10 07:19 tests
drwxrwxrwx 1 www www   4096 Aug 29 21:02 vendor
-rwxrwxrwx 1 www www    263 Aug 10 07:19 vite.config.js
```
We’ll now run `composer install` to install the application dependencies:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml exec backend rm -rf vendor composer.lock
docker-compose --env-file backend/.env  -f docker-compose.dev.yml exec backend composer install
```

Now run `chmod 755 -R storage` to fix permissions:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml exec backend chmod 755 -R storage
```
Now run `php artisan migrate:fresh` or with seeders, run `php artisan migrate:fresh --seed` to run Laravel migrations:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml exec backend php artisan migrate:fresh
```
or
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml exec backend php artisan migrate:fresh --seed
```

The last thing we need to do before testing the application is to generate a unique application key with the `artisan` Laravel command-line tool. This key is used to encrypt user sessions and other sensitive data:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml exec backend php artisan key:generate
```
Now go to your browser and access your server’s domain name or IP address on port 80:
```
http://server_domain_or_IP:80
```
You can use the `logs` command to check the logs generated by your services:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml logs webserver
```
output:
```bash
Attaching to webserver
webserver    | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
webserver    | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
webserver    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
webserver    | 10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf is not a file or does not exist
webserver    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
webserver    | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
webserver    | /docker-entrypoint.sh: Configuration complete; ready for start up
webserver    | 2023/06/01 20:10:43 [notice] 1#1: using the "epoll" event method
webserver    | 2023/06/01 20:10:43 [notice] 1#1: nginx/1.25.0
webserver    | 2023/06/01 20:10:43 [notice] 1#1: built by gcc 12.2.1 20220924 (Alpine 12.2.1_git20220924-r4) 
webserver    | 2023/06/01 20:10:43 [notice] 1#1: OS: Linux 5.19.0-42-generic
webserver    | 2023/06/01 20:10:43 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
webserver    | 2023/06/01 20:10:43 [notice] 1#1: start worker processes
webserver    | 2023/06/01 20:10:43 [notice] 1#1: start worker process 20
webserver    | 2023/06/01 20:10:43 [notice] 1#1: start worker process 21
```
If you want to pause your Docker Compose environment while keeping the state of all its services, run:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml pause
```
output:
```bash
Pausing db        ... done
Pausing app       ... done
Pausing webserver ... done
```
You can then resume your services with:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml unpause
```
output:
```bash
Unpausing webserver ... done
Unpausing app       ... done
Unpausing db        ... done
```
To shut down your Docker Compose environment and remove all of its containers, networks, and volumes, run:
```bash
docker-compose --env-file backend/.env  -f docker-compose.dev.yml down
```
output:
```bash
Stopping webserver ... done
Stopping app       ... done
Stopping db        ... done
Removing webserver ... done
Removing app       ... done
Removing db        ... done
Removing network laravel-react-base_app-network
```
## Conclusion

In this guide, we’ve set up a Docker environment with three containers using Docker Compose to define our infrastructure in a YAML file.

From this point on, you can work on your Laravel application without needing to install and set up a local web server for development and testing. Moreover, you’ll be working with a disposable environment that can be easily replicated and distributed, which can be helpful while developing your application and also when moving towards a production environment.