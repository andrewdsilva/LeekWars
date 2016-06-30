Garden API call
--------------


Call
====
url: /garden/get/ + token,
Method: GET


Response
========

The call returns the following JSON Object:

{
  "success": true,
  "garden": {
    "leeks": [
      {
        "id": 49388,
        "name": "Deceleek",
        "level": 97,
        "talent": 702,
        "fights": 20,
        "skin": 1,
        "hat": null
      },
    ],
    "farmer_enabled": true,
    "team_enabled": true,
    "solo_fights": 40,
    "solo_total_fights": 40,
    "farmer_fights": 20,
    "team_fights": 0,
    "team_total_fights": 20,
    "my_compositions": [
      {
        "id": 17208,
        "name": "Les bébés",
        "total_level": 338,
        "talent": 1696,
        "fights": 0
      },
    ],
    "enemies_compositions": {
      "17138": [
        {
          "id": 15518,
          "total_level": 392,
          "talent": 1069,
          "team": {
            "id": 5124,
            "name": "Alcoholeeks",
            "level": 46,
            "emblem_changed": 1448829318
          }
        },
      ],
    },
    "leek_fights": {
      "49388": 20,
      "49807": 20
    },
    "solo_enemies": {
      "49388": [
        {
          "id": 48045,
          "name": "GreatName",
          "level": 97,
          "talent": 676,
          "skin": 1,
          "hat": null,
          "fights": 0
        },
      ],
    },
    "farmer_enemies": [
      {
        "id": 5745,
        "name": "knilf",
        "avatar_changed": 1404838769,
        "talent": 415,
        "total_level": 206,
        "leek_count": 2
      },
    ],
    "farmer_total_fights": 20,
    "my_farmer": {
      "id": 45299,
      "name": "WelshDwarf",
      "avatar_changed": 0,
      "talent": 496,
      "total_level": 165,
      "leek_count": 2
    },
    "my_team": {
      "id": 5653,
      "name": "WeKillLeeks",
      "level": 34,
      "emblem_changed": 1463478491
    }
  }
}
