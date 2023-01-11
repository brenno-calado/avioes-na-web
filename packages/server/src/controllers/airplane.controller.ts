// public class AirplanesController {
//     @GetMapping("/")
//     public ResponseEntity<List<Airplanes>> getAllAirplanes() {
//         try {
//             List<Airplanes> listOfAirplanes = new ArrayList<>();

import AirplaneRepository from "../repositories/airplane.repository";

//             repository.findAll().forEach(listOfAirplanes::add);

//             if (listOfAirplanes.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

//             return new ResponseEntity<>(listOfAirplanes, HttpStatus.OK);
//         } catch (Exception e) {
//             System.out.println(String.format("Exception while fetching getAllAirplanes method. Error: %s", e.getMessage()));
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @GetMapping("/fastest")
//     public ResponseEntity<List<Airplanes>> getFastestAirplanes() {
//         try {
//         List<Airplanes> listOfAirplanes = new ArrayList<>();

//         repository.findAll(Sort.by("maximumSpeed").descending()).forEach(listOfAirplanes::add);
//         if (listOfAirplanes.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

//         return new ResponseEntity<List<Airplanes>>(listOfAirplanes.subList(0, 10), HttpStatus.OK);
//         } catch (Exception e) {
//             System.out.println(String.format("Exception while fetching getFastestAirplanes method. Error: %s", e.getMessage()));
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     @GetMapping("/slowest")
//     public ResponseEntity<List<Airplanes>> getslowestAirplanes() {
//         try {
//         List<Airplanes> listOfAirplanes = new ArrayList<>();

//         repository.findAll(Sort.by("maximumSpeed").ascending()).forEach(arg -> {
//             if (arg.getMaximumSpeed() != null) {
//                 listOfAirplanes::add(arg)
//             }
//         });

//         if (listOfAirplanes.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

//         return new ResponseEntity<List<Airplanes>>(listOfAirplanes.subList(0, 10), HttpStatus.OK);
//         } catch (Exception e) {
//             System.out.println(String.format("Exception while fetching getSlowestAirplanes method. Error: %s", e.getMessage()));
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// }

class AirplaneController {
  private static instance: AirplaneController;
  private repository: AirplaneRepository;

  constructor() {
    this.repository = AirplaneRepository.getInstance();
  }

  static getInstance(): AirplaneController {
    if (!AirplaneController.instance) {
      AirplaneController.instance = new AirplaneController();
    }

    return AirplaneController.instance;
  }

  async get() {}

  async getFastest() {
    return this.repository.findAll(
      { "Maximum speed": { $ne: null } },
      { "Maximum speed": -1 },
      { page: 1, take: 10 }
    );
  }

  async getSlowest() {
    return this.repository.findAll(
      { "Maximum speed": { $ne: null } },
      { "Maximum speed": 1 },
      { page: 1, take: 10 }
    );
  }
}

export default AirplaneController;
