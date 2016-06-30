Login API call
--------------


Call
====
url: /farmer/login-token
Method: POST
Parameters: login, password


Response
========

The call returns the following JSON Object:




{
    "success": true,
    "farmer": {
        "id": 12345,
        "login": "MyLogin",
        "team": {
            "id": 1234,
            "name": "MyTeam",
            "level": 45,
            "emblem_changed": 1463478491
        },
        "name": "MyName",
        "talent": 496,
        "leeks": {
            "49388": {
                "id": 49388,
                "name": "LeekName",
                "color": "#00aa00",
                "capital": 50,
                "level": 97,
                "talent": 702,
                "skin": 1,
                "hat": null
            },
        },
        "avatar_changed": 0,
        "talent_more": 141,
        "victories": 1090,
        "fights": [
            {
                "id": 17895798,
                "date": 1467217870,
                "type": 1,
                "context": 3,
                "status": 1,
                "winner": 0,
                "farmer_team": 2,
                "result": "draw",
                "farmer1": 45237,
                "farmer2": 45299,
                "farmer1_name": "Philippines",
                "farmer2_name": "MyLeek"
            },
        ],
        "draws": 174,
        "defeats": 531,
        "ratio": "2.05",
        "connected": false,
        "last_connection": 1467183507,
        "register_date": 1464072833,
        "tournaments": [
            {
                "id": 32284,
                "date": 1467216001
            },
        ],
        "admin": false,
        "moderator": false,
        "country": null,
        "godfather": {
            "id": 37959,
            "name": "Andrew"
        },
        "godsons": [],
        "color": "",
        "banned": 0,
        "won_solo_tournaments": 2,
        "won_farmer_tournaments": 0,
        "won_team_tournaments": 0,
        "total_level": 165,
        "leek_count": 2,
        "habs": 577905,
        "crystals": 0,
        "weapons": [
            {
                "id": 508999,
                "template": 37
            },
        ],
        "chips": [
            {
                "id": 509817,
                "template": 19
            },
        ],
        "ais": [
            {
                "id": 187845,
                "name": "Autofire - lvl 50",
                "level": 57
            },
        ],
        "potions": [
            {
                "id": 509000,
                "template": 58,
                "quantity": 19
            }
        ],
        "hats": [],
        "tournament": {
            "registered": false,
            "current": null
        },
        "candidacy": null
    },
    "token": "282b622cd5fd28e5cfc264bf0fdfdfb1caa75a365dfaec01f5d6c2c133095c34"
}