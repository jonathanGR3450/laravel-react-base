<?php

declare(strict_types=1);

namespace App\Domain\User\Aggregate;

use App\Domain\Shared\ValueObjects\DateTimeValueObject;
use App\Domain\Shared\ValueObjects\StringValueObject;
use App\Domain\User\ValueObjects\Address;
use App\Domain\User\ValueObjects\CellPhone;
use App\Domain\User\ValueObjects\City;
use App\Domain\User\ValueObjects\Email;
use App\Domain\User\ValueObjects\Id;
use App\Domain\User\ValueObjects\Identification;
use App\Domain\User\ValueObjects\IsManager;
use App\Domain\User\ValueObjects\IsSigner;
use App\Domain\User\ValueObjects\IsVerified;
use App\Domain\User\ValueObjects\LastName;
use App\Domain\User\ValueObjects\Name;
use App\Domain\User\ValueObjects\Password;
use App\Domain\User\ValueObjects\CityRegister;
use Illuminate\Support\Facades\Mail;

final class User
{
    private function __construct(
        private Id $id,
        private Name $name,
        private LastName $last_name,
        private Email $email,
        private Identification $identification,
        private CellPhone $cell_phone,
        private City $city,
        private Address $address,
        private CityRegister $city_register,
        private IsManager $is_manager,
        private IsSigner $is_signer,
        private ?IsVerified $is_verified,
        private Password $password,
        private DateTimeValueObject $created_at,
        private ?DateTimeValueObject $updated_at
    ) {
    }

    public static function create(
        Id $id,
        Name $name,
        LastName $last_name,
        Email $email,
        Identification $identification,
        CellPhone $cell_phone,
        City $city,
        Address $address,
        CityRegister $city_register,
        IsManager $is_manager,
        IsSigner $is_signer,
        ?IsVerified $is_verified = null,
        Password $password,
        DateTimeValueObject $created_at,
        ?DateTimeValueObject $updated_at = null
    ): self {
        return new self(
            $id,
            $name,
            $last_name,
            $email,
            $identification,
            $cell_phone,
            $city,
            $address,
            $city_register,
            $is_manager,
            $is_signer,
            $is_verified,
            $password,
            $created_at,
            $updated_at
        );
    }

    public function id(): Id
    {
        return $this->id;
    }

    public function email(): Email
    {
        return $this->email;
    }

    public function name(): Name
    {
        return $this->name;
    }

    public function lastName(): LastName
    {
        return $this->last_name;
    }

    public function identification(): Identification
    {
        return $this->identification;
    }

    public function cellPhone(): CellPhone
    {
        return $this->cell_phone;
    }

    public function city(): City
    {
        return $this->city;
    }

    public function address(): Address
    {
        return $this->address;
    }

    public function cityRegister(): CityRegister
    {
        return $this->city_register;
    }

    public function isManager(): IsManager
    {
        return $this->is_manager;
    }

    public function isSigner(): IsSigner
    {
        return $this->is_signer;
    }

    public function isVerified(): ?IsVerified
    {
        return $this->is_verified;
    }

    public function password(): Password
    {
        return $this->password;
    }

    public function createdAt(): DateTimeValueObject
    {
        return $this->created_at;
    }

    public function updatedAt(): ?DateTimeValueObject
    {
        return $this->updated_at;
    }

    public function updateName(string $name): void
    {
        $this->name = Name::fromString($name);
    }

    public function updateLastName(string $last_name): self
    {
        $this->last_name = LastName::fromString($last_name);
        return $this;
    }

    public function updateIdentification(int $identification): self
    {
        $this->identification = Identification::fromInteger($identification);
        return $this;
    }

    public function updateCellPhone(int $cell_phone): self
    {
        $this->cell_phone = CellPhone::fromInteger($cell_phone);
        return $this;
    }

    public function updateCity(string $city): self
    {
        $this->city = City::fromString($city);
        return $this;
    }

    public function updateAddress(string $address): self
    {
        $this->address = Address::fromString($address);
        return $this;
    }

    public function updateCityRegister(string $city_register): self
    {
        $this->city_register = CityRegister::fromString($city_register);
        return $this;
    }

    public function updateIsManager(bool $is_manager): self
    {
        $this->is_manager = IsManager::fromBoolean($is_manager);
        return $this;
    }

    public function updateIsSigner(bool $is_signer): self
    {
        $this->is_signer = IsSigner::fromBoolean($is_signer);
        return $this;
    }

    public function updateIsVerified(string $is_verified): self
    {
        $this->is_verified = IsVerified::fromString($is_verified);
        return $this;
    }

    public function updateEmail(string $email): void
    {
        $this->email = Email::fromString($email);
    }

    public function updatePassword(string $password): void
    {
        $this->password = Password::fromString($password);
    }

    public function sendEmailUserWasRegistered(): void
    {
        Mail::send('emails.mail', $this->asArray(), function ($message) {
            $message->to($this->email()->value())
                    ->subject("Bienvenido a {$this->name()->value()}");
            $message->from($this->email()->value());
        });
    }

    public function asArray(): array
    {
        return [
            'id' => $this->id()->value(),
            'name' => $this->name()->value(),
            'last_name' => $this->name()->value(),
            'email' => $this->email()->value(),
            'identification' => $this->identification()->value(),
            'cell_phone' => $this->cellPhone()->value(),
            'city' => $this->city()->value(),
            'address' => $this->address()->value(),
            'city_register' => $this->cityRegister()->value(),
            'is_manager' => $this->isManager()->value(),
            'is_signer' => $this->isSigner()->value(),
            'is_verified' => $this->isVerified()?->value(),
            'created_at' => $this->createdAt()->value(),
            'updated_at' => $this->updatedAt()?->value()
        ];
    }
}
