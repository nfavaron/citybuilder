import { ApplicationConfigInterface } from '../interface/application-config.interface';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { Database, ref, onValue  } from '@firebase/database';
import { EventService } from './event.service';
import { WorldConfigInterface } from '../interface/world-config.interface';

export class DatabaseService {

  /**
   * Firebase database
   */
  private database: Database;

  /**
   * Constructor
   */
  constructor(
    private applicationConfig: ApplicationConfigInterface,
    private eventService: EventService,
  ) {

    // Initialize Realtime Database and get a reference to the service
    this.database = getDatabase(
      initializeApp(applicationConfig.firebaseConfig),
    );
  }

  /**
   * Select world config from database
   */
  selectWorldConfig(): void {

    onValue(ref(this.database, 'config'), (snapshot) => {

      this.eventService.emit<WorldConfigInterface>({
        name: 'receive-world-config',
        payload: snapshot.val() as WorldConfigInterface,
      });
    });
  }
}
