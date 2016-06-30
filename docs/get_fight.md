Garden API call
--------------


Call
====
url: /fight/get/ + fightId,
Method: GET


Response
========

The call returns the following JSON Object:

{
  "success": true,
  "fight": {
    "id": 17905633,
    "date": 1467284551,
    "year": 2016,
    "type": 0,
    "context": 2,
    "status": 0,
    "winner": -1, //-1 is a draw
    "leeks1": [
      {
        "id": "49388",
        "name": "Deceleek",
        "level": 97,
        "talent": 686,
        "hat": null,
        "skin": 1
      }
    ],
    "leeks2": [
      {
        "id": "30837",
        "name": "LordBordeleek",
        "level": 97,
        "talent": 612,
        "hat": null,
        "skin": 1
      }
    ],
    "farmers1": {
      "45299": {
        "id": 45299,
        "name": "WelshDwarf",
        "avatar_changed": 0
      }
    },
    "farmers2": {
      "27386": {
        "id": 27386,
        "name": "LordDigital",
        "avatar_changed": 1421340329
      }
    },
    "data": null,
    "report": null,
    "comments": [],
    "tournament": -1,
    "queue": {
      "position": 0,
      "total": 0
    },
    "team1_name": "Deceleek",
    "team2_name": "LordBordeleek"
  }
}
