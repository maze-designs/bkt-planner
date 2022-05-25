// import { sessions, records } from './db'; //TODO: replace, deprecated
import colors from 'colors/safe';



export async function getRecord(req: any, res: any) {
    //TODO: get from DB
    res.send(
        [{
            "ref": "332574945713324232",
            "ts": 1653427034020000,
            "data": {
              "user": "testuser",
              "addedDate": "1653426898089",
              "startDate": "1653285600",
              "endDate": "1653287400",
              "name": "Test Record",
              "description": "asdLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
          },
          {
            "ref": "332574945713324233",
            "ts": 16534270340200044,
            "data": {
              "user": "testuser",
              "addedDate": "1653426898090",
              "startDate": "1653289200",
              "endDate": "1653294000",
              "name": "Test Record 2",
              "description": "asdLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
          }]
    );
}

