<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231202200719 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE delivery DROP FOREIGN KEY FK_3781EC10BB70BC0E');
        $this->addSql('ALTER TABLE delivery ADD CONSTRAINT FK_3781EC10BB70BC0E FOREIGN KEY (shift_id) REFERENCES shift (id) ON DELETE SET NULL');
        $this->addSql('ALTER TABLE shift DROP FOREIGN KEY FK_A50B3B45B6A6A3F4');
        $this->addSql('ALTER TABLE shift ADD CONSTRAINT FK_A50B3B45B6A6A3F4 FOREIGN KEY (deliverer_id) REFERENCES deliverer (id) ON DELETE SET NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE shift DROP FOREIGN KEY FK_A50B3B45B6A6A3F4');
        $this->addSql('ALTER TABLE shift ADD CONSTRAINT FK_A50B3B45B6A6A3F4 FOREIGN KEY (deliverer_id) REFERENCES deliverer (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE delivery DROP FOREIGN KEY FK_3781EC10BB70BC0E');
        $this->addSql('ALTER TABLE delivery ADD CONSTRAINT FK_3781EC10BB70BC0E FOREIGN KEY (shift_id) REFERENCES shift (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
    }
}
