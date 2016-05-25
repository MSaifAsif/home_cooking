#!/bin/env bash
while true
do
 sleep 5
 rsync /media/sf_home_cooking_parent/* /home/mean/projects/home_cooking/ -rva
done