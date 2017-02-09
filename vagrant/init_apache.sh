#!/usr/bin/env bash

apt-get update
apt-get install -y vim
/etc/init.d/apache2 start
a2ensite 001-vhost1.conf
a2ensite 002-vhost2.conf
a2ensite 003-vhost3.conf
apt-get install -y php5
apt-get install -y libapache2-mod-php5
a2enmod rewrite
ln -s /var/www/css /var/www/admin/css
ln -s /var/www/js /var/www/admin/js
ln -s /var/www/img /var/www/admin/img
ln -s /var/www/conf /var/www/admin/conf
ln -s /var/www/fonts /var/www/admin/fonts