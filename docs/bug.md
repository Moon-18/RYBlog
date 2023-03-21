win启动mysql

mysql -hlocalhost -uroot -proot 进入mysql数据库，其中-h表示服务器名，localhost表示本地；

```
alter user 'root'@'localhost' identified with mysql_native_password by '020331';
```