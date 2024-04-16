### Los result tienen que mandarse con .rows para no mandar los metadatos

### En postgreSQL la sinsaxis es un poco diferente que en SQL server. Para PostgreSQL, el driver pg utiliza $1, $2, etc., para representar los parámetros en la consulta SQL, mientras que para SQL Server, el driver más comúnmente utilizado, mssql, utiliza @param1, @param2, etc.

### La string de conexion de postgreSQL tiene todo lo necesario para conectarse directamente a la BD.