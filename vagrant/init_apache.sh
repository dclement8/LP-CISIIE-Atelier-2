#!/usr/bin/env bash

apt-get update
apt-get install -y vim
apt-get install -y apache2
apt-get install -y php5
service apache2 start