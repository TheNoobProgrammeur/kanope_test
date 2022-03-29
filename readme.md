# Test technique Kanope


## Start App

Un docker-commpose permet de lancer la stack. Il permet de faire un provisioning des utilisateur.  
Si vous ne voulais pas utiliser un docker crée une db `testKanope` dans un serber mongodb est enregisdre le doc `db/user_provisioning.json` dans un collection `users`
 
Commande:

```bash
docker-compose up -d
```

Si vous voulez lancer l'application separement changer l'address de connection de l'api a la db dans le fichier suivent :
- `api/src/services/mongoose.service.ts`

commande pour lancer le front :

```bash
quasar dev 
```


## Interface

Le site est disponible a l'adresse `localhost:8080`

Vous pouvez vous conecter avec les infos suivent :

- email: jford@gmail.com
- password: passwordTwo


## API 

_Une colection postman est disponible avec l'ensemble des requettes._

### Auth

Route: `/auth`

#### POST

body
```json
{
    "email": "jford@gmail.com",
    "password": "passwordTwo"
}
```

exemple retour
```json
{
    "message": "login successful",
    "tokenType": "Bearer",
    "token": "SUPER_SECURE_TOKEN"
}
```

### Calback

Route: `/callback`

#### POST 

body 
```json
{
    "imei": "866802022363388",
    "devices": {
        "d5:ab:87:e0:23:7b": {
            "rssi": -70,
            "data":"0201040319430409094f524d41524556310d032e09ad080a0afd03"
        }
    }
}
```

exemple de retour
```json
{
    "message": "data save"
}
```

### User

Route: `/user`

#### GET

exemple retour 
```json
[
    {
        "userName": "Jen Ford",
        "email": "jford@gmail.com"
    },
    {
        "userName": "Joe Smith",
        "email": "jsmith@gmail.com"
    }
]
```

### Rooter

Route: `/rooter`  
Authorization: Bearer Token

#### Get

exemple de retour
```json
[
    {
        "_id": "62434fcf6916ded37f3ad766",
        "name": "Name rooter",
        "imei": "866802022363388",
        "sensorTable": [
            {
                "macAddress": "d5:ab:87:e0:23:4b",
                "sensorHistoryTrace": [
                    {
                        "rssi": -83,
                        "_id": "62434fcf6916ded37f3ad76e",
                        "time": "2022-03-29T18:28:31.155Z"
                    }
                ]
            }
        ]
    }
]
```

#### POST

exemple body
```json
{
    "imei": "866802022363388",
    "name": "js suis un test"
}
```

exemple de retour
```json
{
    "message": "Rooter 866802022363388 is create"
}
```

#### PATCH

exemple body
```json
{
    "imei": "866802022363388",
    "name": "js suis un test"
}
```

exemple de retour
```json
{
    "message": "Rooter 866802022363388 name is update"
}
```

### Sensor

Route: `/sensor`  
Authorization: Bearer Token

#### Get

exemple de retour
```json
[
    {
        "_id": "62434fcf6916ded37f3ad76a",
        "name": "Name sensor",
        "macAddress": "d5:ab:87:e0:23:4b",
        "dataStatements": [
            {
                "data": {
                    "tempOne": 23.5,
                    "tempTwo": 22.21,
                    "humidity": 25.7,
                    "airPressure": 1021
                },
                "_id": "62434fcf6916ded37f3ad76b",
                "date": "2022-03-29T18:28:31.147Z"
            }
        ]
    }
]
```

#### POST

exemple body
```json
{
    "macAddress": "d5:cc:87:e0:23:9b",
    "name": "Sensor name"
}
```

exemple de retour
```json
{
    "message": "Sensor d5:cc:87:e0:23:9b is create"
}
```

#### PATCH

exemple body
```json
{
    "macAddress": "d5:cc:87:e0:23:9b",
    "newName": "new Name"
}
```

exemple de retour
```json
{
    "message": "Sensor d5:cc:87:e0:23:9b name is update"
}
```
