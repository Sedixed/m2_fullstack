<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231123215532 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE delivery ADD shift_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE delivery ADD CONSTRAINT FK_3781EC10BB70BC0E FOREIGN KEY (shift_id) REFERENCES shift (id)');
        $this->addSql('CREATE INDEX IDX_3781EC10BB70BC0E ON delivery (shift_id)');
        $this->addSql('ALTER TABLE shift ADD deliverer_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE shift ADD CONSTRAINT FK_A50B3B45B6A6A3F4 FOREIGN KEY (deliverer_id) REFERENCES deliverer (id)');
        $this->addSql('CREATE INDEX IDX_A50B3B45B6A6A3F4 ON shift (deliverer_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE delivery DROP FOREIGN KEY FK_3781EC10BB70BC0E');
        $this->addSql('DROP INDEX IDX_3781EC10BB70BC0E ON delivery');
        $this->addSql('ALTER TABLE delivery DROP shift_id');
        $this->addSql('ALTER TABLE shift DROP FOREIGN KEY FK_A50B3B45B6A6A3F4');
        $this->addSql('DROP INDEX IDX_A50B3B45B6A6A3F4 ON shift');
        $this->addSql('ALTER TABLE shift DROP deliverer_id');
    }
}
