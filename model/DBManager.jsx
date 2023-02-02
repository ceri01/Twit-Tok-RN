import * as SQLite from "expo-sqlite"
import UtilityStorageManager from "./UtilityStorageManager";

class DBManager {
    static database = null
    constructor(uid) {
        if (uid !== null && uid !== undefined) {
            this.db = SQLite.openDatabase("Twit-tok-db");
            const profile_table = "CREATE TABLE IF NOT EXISTS Profile(uid INTEGER PRIMARY KEY, name TEXT, picture BLOB(100000) CHECK(LENGTH(picture) <= 100000), pversion SMALLINT, FOREIGN KEY(uid) REFERENCES Followed_users(followed));";
            const followed_user_table = "CREATE TABLE IF NOT EXISTS Followed_users(uid INTEGER PRIMARY KEY, name TEXT, picture BLOB(100000) CHECK(LENGTH(picture) <= 100000) NOT NULL, pversion SMALLINT NOT NULL, follower INTEGER NOT NULL);";
            const profile_trigger = "CREATE TRIGGER unique_profile BEFORE INSERT ON Profile FOR EACH ROW BEGIN SELECT RAISE(ABORT, \"User already exists\") FROM Profile WHERE uid <> " + uid + "; END;";
            const unique_follower_trigger = "CREATE TRIGGER only_one_follower BEFORE INSERT ON Followed_users FOR EACH ROW BEGIN SELECT RAISE(ABORT, \"Follower must be unique user in Profile\") FROM Followed_users WHERE NEW.follower <> " + uid + "; END;";
            const duplicate_followed_trigger = "CREATE TRIGGER no_duplicate_followed BEFORE INSERT ON Followed_users FOR EACH ROW BEGIN SELECT RAISE(ABORT, \"Followed user already exists\") FROM Followed_users WHERE NEW.uid = uid; END;";
            const insert_profile = "INSERT INTO Profile(uid, name, picture, pversion) VALUES (" + uid + ", \"\", \"\", 0);";
            this.db.transaction(t => {
                t.executeSql(followed_user_table, [], () => {}, (tx, err) => {console.log("1 " + err)});
                t.executeSql(profile_table, [], () => {}, (tx, err) => {console.log("2 " + err)});
                t.executeSql(profile_trigger, [], () => {}, (tx, err) => {console.log("3 " + err)});
                t.executeSql(unique_follower_trigger, [], () => {}, (tx, err) => {console.log("4 " + err)});
                t.executeSql(duplicate_followed_trigger, [], () => {}, (tx, err) => {console.log("5 " + err)});
                t.executeSql(insert_profile, [], () => {}, (tx, err) => {console.log("6 " + err)});
            });
        }
    }


    clearDB() {
        const delete_profile_table = "DROP TABLE Profile;";
        const delete_followed_user_table = "DROP TABLE Followed_users;";
        this.db.transaction(t => {
            t.executeSql(delete_profile_table, [], (tx, resultSet) => {
                console.log("Profile table dropped.");
            }, (tx, error) => {
                // TODO: Verificare se opportuno gestire l'errore in modo differente
                console.log("1 " + error.message);
            });
            t.executeSql(delete_followed_user_table, [], (tx, resultSet) => {
                console.log("Followed_users table dropped.");
            }, (tx, error) => {
                // TODO: Verificare se opportuno gestire l'errore in modo differente
                console.log("2 " + error.message);
            });
        });
    }

    updateProfilePicture(picture) {
        UtilityStorageManager.getProfileUid().then((uid) => {
            const query = "UPDATE Profile SET picture = ?, pversion = pversion + 1 WHERE uid = ?;";
            if (typeof(picture) === "string") {
                this.db.transaction(tx => {
                    tx.executeSql(query, [picture, uid], () => {
                        console.log("Profile picture changed.");
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

    updateProfileName(name) {
        UtilityStorageManager.getProfileUid().then((uid) => {
            const query = "UPDATE Profile SET name = ? WHERE uid = ?;";
            if (typeof(name) === "string") {
                this.db.transaction(tx => {
                    tx.executeSql(query, [name, uid], (tx, resultSet) => {
                        console.log("Profile name changed.");
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
                this.db.transaction(tx => {
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
            this.db.transaction(tx => {
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
            this.db.transaction(tx => {
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
            this.db.transaction(tx => {
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

    getProfileData(onResult) {
        const query = "SELECT * FROM Profile";
        this.db.transaction(tx => {
            tx.executeSql(query, [], (tx, resultSet) => {
                let result = resultSet.rows._array[0];
                onResult(result)
            }, (tx, error) => {
                console.log(error)
            });
        });
    }

    getFollowed() {
        // TODO: Fornire un metodo per gestire il risultato ottenuto
        const query = "SELECT * FROM Followed_users";
        this.db.transaction(tx => {
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