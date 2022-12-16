import * as SQLite from "expo-sqlite"
import UtilityStorageManager from "./UtilityStorageManager";

class DBManager {
    static db = null

    constructor() {
        UtilityStorageManager.getProfileUid().then((uid) => {
            DBManager.db = SQLite.openDatabase("Twit-tok-db");
            // TODO: Controllare se sensibile a sql-injection (non utile per il momento perchè non sono previsti input dell'utente in questo codice).
            // TODO: Rimietti i nomi nel DB
            const profile_table = "CREATE TABLE IF NOT EXISTS Profile(uid INTEGER PRIMARY KEY, picture BLOB(100000) CHECK(LENGTH(picture) <= 100000), pversion SMALLINT, FOREIGN KEY(uid) REFERENCES Followed_users(followed));";
            const followed_user_table = "CREATE TABLE IF NOT EXISTS Followed_users(uid INTEGER PRIMARY KEY, picture BLOB(100000) CHECK(LENGTH(picture) <= 100000) NOT NULL, pversion SMALLINT NOT NULL, follower INTEGER NOT NULL);";
            const profile_trigger = "CREATE TRIGGER unique_profile BEFORE INSERT ON Profile FOR EACH ROW BEGIN SELECT RAISE(ABORT, \"User already exists\") FROM Profile WHERE uid <> " + uid + "; END;";
            const unique_follower_trigger = "CREATE TRIGGER only_one_follower BEFORE INSERT ON Followed_users FOR EACH ROW BEGIN SELECT RAISE(ABORT, \"Follower must be unique user in Profile\") FROM Followed_users WHERE NEW.follower <> " + uid + "; END;";
            const duplicate_followed_trigger = "CREATE TRIGGER no_duplicate_followed BEFORE INSERT ON Followed_users FOR EACH ROW BEGIN SELECT RAISE(ABORT, \"Followed user already exists\") FROM Followed_users WHERE NEW.uid = uid; END;";
            const insert_profile = "INSERT INTO Profile(uid, picture, pversion) VALUES (" + uid + ", \"\", 0);";
            // TODO: Verificare cosa mettere nelle callback e come gestire gli errori.
            DBManager.db.transaction(t => {
                t.executeSql(followed_user_table, [], () => {}, (tx, err) => {console.log("1" + err)});
                t.executeSql(profile_table, [], () => {}, (tx, err) => {console.log("2" + err)});
                t.executeSql(profile_trigger, [], () => {}, (tx, err) => {console.log("3" + err)});
                t.executeSql(unique_follower_trigger, [], () => {}, (tx, err) => {console.log(err)});
                t.executeSql(duplicate_followed_trigger, [], () => {}, (tx, err) => {console.log("5" + err)});
                t.executeSql(insert_profile, [], () => {}, (tx, err) => {console.log("6" + err)});
            });
        }).catch((err) => {
            // TODO: Gestire meglio l'errore nella creazione del database.
            console.log(err);
        });
    }

    clearDB() {
        console.log(DBManager.db)
        const delete_profile_table = "DROP TABLE Profile;";
        const delete_followed_user_table = "DROP TABLE Followed_users;";
        DBManager.db.transaction(t => {
            t.executeSql(delete_followed_user_table);
            t.executeSql(delete_profile_table);
        });
    }

    updateProfilePicture(picture) {
        // TODO: Fornire un metodo per gestire il risultato ottenuto
        UtilityStorageManager.getProfileUid().then((uid) => {
            const query = "UPDATE Profile SET picture = ?, pversion = pversion + 1 WHERE picture <> ?;";
            if (typeof(picture) === "string") {
                DBManager.db.transaction(tx => {
                    tx.executeSql(query, [picture, picture], (tx, resultSet) => {
                        console.log("Change occurred " + resultSet);
                    }, (tx, error) => {
                        // TODO: Verificare se opportuno gestire l'errore in modo differente
                        console.log(error.message);
                    });
                });
            } else {
                throw new Error("picture must be a string");
            }
        });
    }

    addFollowed(data) {
        // TODO: Fornire un metodo per gestire il risultato ottenuto
        let query = null;
        UtilityStorageManager.getProfileUid().then((uid) => {
            query = "INSERT INTO Followed_users(uid, picture, pversion, follower) VALUES (?, ?, ?, " + uid + ")";
            if (typeof(data) === "object") {
                DBManager.db.transaction(tx => {
                    tx.executeSql(query, [data.getUid(), data.getPicture(), data.getPversion()], (tx, resultSet) => {
                        console.log("Change occurred " + resultSet);
                    }, (tx, error) => {
                        // TODO: Verificare se opportuno gestire l'errore in modo differente
                        console.log(error.message);
                    });
                });
            } else {
                throw new Error("data must be an object");
            }
        });
    }

    removeFollowed(uid) {
        const query = "DELETE FROM Followed_users WHERE uid = ?;";
        if (typeof(uid) === "number") {
            DBManager.db.transaction(tx => {
                tx.executeSql(query, [uid], (tx, resultSet) => {
                    console.log("Change occurred " + resultSet);
                }, (tx, error) => {
                    // TODO: Verificare se opportuno gestire l'errore in modo differente
                    console.log(error.message);
                });
            });
        } else {
            throw new Error("uid must be a number");
        }
    }

    updateFolowedPicture(uid, picture) {
        const query = "UPDATE Followed_users SET picture = ?, pversion = pversion + 1 WHERE uid = ? AND picture <> ?;";
        if (typeof(uid) === "number" && typeof(picture) === "string") {
            DBManager.db.transaction(tx => {
                tx.executeSql(query, [picture, uid, picture], (tx, resultSet) => {
                    console.log("Change occurred " + resultSet);
                }, (tx, error) => {
                    // TODO: Verificare se opportuno gestire l'errore in modo differente
                    console.log(error.message);
                });
            });
        } else {
            throw new Error("uid must be a number and picture must be a string");
        }
    }

    getFollowedVersionPicture(uid) {
        const query = "SELECT pversion FROM Followed_users WHERE uid = ?;";
        if (typeof(uid) === "number") {
            DBManager.db.transaction(tx => {
                tx.executeSql(query, [uid], (tx, resultSet) => {
                    console.log("Change occurred " + resultSet.rows._array[0].pversion);
                    return resultSet.rows._array[0].value;
                }, (tx, error) => {
                    // TODO: Verificare se opportuno gestire l'errore in modo differente
                    console.log(error.message);
                });
            });
        } else {
            throw new Error("uid must be a number");
        }
    }

    getProfileData() {
        // TODO: Fornire un metodo per gestire il risultato ottenuto
        const query = "SELECT * FROM Profile";
        DBManager.db.transaction(tx => {
            tx.executeSql(query, [], (tx, resultSet) => {
                console.log(JSON.stringify(resultSet.rows));
            }, (tx, error) => {
                // TODO: Verificare se opportuno gestire l'errore in modo differente
                console.log(error)
            });
        });
    }

    getFollowed() {
        // TODO: Fornire un metodo per gestire il risultato ottenuto
        const query = "SELECT * FROM Followed_users";
        DBManager.db.transaction(tx => {
            tx.executeSql(query, [], (tx, resultSet) => {
                console.log(JSON.stringify(resultSet.rows))
            }, (tx, error) => {
                // TODO: Verificare se opportuno gestire l'errore in modo differente
                console.log(error)
            });
        });
    }


}

export default DBManager;