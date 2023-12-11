FROM php:8.2.11-apache

ADD https://github.com/mlocati/docker-php-extension-installer/releases/latest/download/install-php-extensions /usr/local/bin/
RUN chmod +x /usr/local/bin/install-php-extensions && \
    install-php-extensions pdo_mysql intl zip pcntl

# Install composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && \
    php composer-setup.php --install-dir=/usr/bin --filename=composer && \
    rm composer-setup.php

COPY . /var/www/
RUN mkdir -p /var/www/var && chown -R www-data:www-data /var/www/var

# Setup the apache conf
COPY ./docker/apache.conf /etc/apache2/sites-available/000-default.conf


RUN cd /var/www && \
    composer install

# Expose the HTTP & Websocket ports and set the container workdir
EXPOSE 80 8080
WORKDIR /var/www/

# Set the entrypoint
ENTRYPOINT [ "bash", "./docker/docker.sh" ]
