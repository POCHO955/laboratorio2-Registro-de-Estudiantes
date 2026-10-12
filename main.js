import { EstudianteView } from "./src/views/EstudianteView.js";
import { EstudianteController } from "./src/controllers/EstudianteController.js";
document.addEventListener("DOMContentLoaded", () => {
    const view = new EstudianteView();
    new EstudianteController(view);
});
//# sourceMappingURL=main.js.map