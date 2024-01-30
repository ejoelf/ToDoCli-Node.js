import { createInterface } from "readline";
import chalk from "chalk";

const tareas = [];

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

//FUNCIÓN VISUALIZACIÓN DEL MENU

function menuDisplay() {
  console.log(chalk.yellow.bold("\n👉👉 To Do App 👈👈 \n"));
  console.log(chalk.blue.bold("Opciones: "));
  console.log("1. Agregar Tarea");
  console.log("2. Ver Tareas");
  console.log("3. Completar Tarea");
  console.log("4. Eliminar Tarea");
  console.log("5. Salir");
}

//FUNCIONES  DEL MENU:

function agregarTarea() {
  rl.question(chalk.bgBlue("Escribe tu Tarea: "), (tarea) => {
    tareas.push({ tarea, completada: false });
    console.log(chalk.green.bold("\n👌 Tarea agregada con éxito\n"));
    menuDisplay();
    elegirOpcion();
  });
}

function verTarea() {
  console.log(chalk.yellow.bold("\n ✍️ Tareas ✍️ \n"));

  if (tareas.length === 0) {
    return console.log(chalk.green.bold("\nNo hay tareas para mostrar\n"));
  } else {
    tareas.forEach((tarea, indice) => {
      let estado = tarea.completada ? "✅" : "❌";

      if (tarea.completada) {
        console.log(
          chalk.green.bold(`${indice + 1}. ${estado} - ${tarea.tarea}`)
        );
      } else {
        console.log(
          chalk.red.bold(`${indice + 1}. ${estado} - ${tarea.tarea}`)
        );
      }
    });
  }
  menuDisplay();
  elegirOpcion();
}

function completarTarea() {
  rl.question(chalk.bgBlue("¿Que tarea quieres completar? "), (tarea) => {
    const indice = parseInt(tarea) - 1;

    if (indice >= 0 && indice < tareas.length) {
      tareas[indice].completada = true;
      console.log(chalk.green.bold("\n👌 Tarea completada con éxito\n"));
    } else {
      console.log(chalk.red.bold("\nLa tarea seleccionada no existe\n"));
    }
    menuDisplay();
    elegirOpcion();
  });
}

function eliminarTarea() {
  rl.question(chalk.bgBlue("¿Qué tarea deseas eliminar? "), (tarea) => {
    const indice = parseInt(tarea) - 1;
    if (indice < 0 || isNaN(parseInt(tarea))) {
      console.log(chalk.red.bold("\nSelecciona un número de la lista.\n"));
    } else {
      tareas.splice(indice, 1);
      console.log(chalk.yellow.bold("\n👌 Tarea eliminada correctamente\n"));
    }
    menuDisplay();
    elegirOpcion();
  });
}

//FUNCIÓN PARA ELEGIR LA OPCION DE LA CONSOLA

function elegirOpcion() {
  rl.question("\nDigita el numero de tu opcion: ", (opcion) => {
    switch (opcion) {
      case "1":
        agregarTarea();
        break;
      case "2":
        verTarea();
        break;
      case "3":
        completarTarea();
        break;
      case "4":
        eliminarTarea();
        break;
      case "5":
        console.log("👋 ADIOS!!! 👋");
        rl.close();
        break;
      default:
        console.log(chalk.red("Opcion invalida \n"));
        menuDisplay();
        elegirOpcion();
        break;
    }
  });
}

menuDisplay();
elegirOpcion();
