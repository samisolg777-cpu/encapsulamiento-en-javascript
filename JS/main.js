
  // ---------- 1. LA CLASE (el "molde") ----------
  class Alcancia {
    #dinero = 0;                       //  privado: solo la clase lo toca
    
    guardar(cantidad) {                //  botón público
      if (cantidad <= 0) throw new Error("Solo se puede guardar más de $0.");
      this.#dinero += cantidad;
    }
    
    sacar(cantidad) {                  //  botón público con regla
      if (cantidad <= 0) throw new Error("Escribe una cantidad mayor a $0.");
      if (cantidad > this.#dinero) throw new Error("No hay suficiente dinero.");
      this.#dinero -= cantidad;
    }

    verSaldo() {                       //  solo lectura
      return this.#dinero;
    }
    

  }

  // ---------- 2. CONECTAR CON LA PÁGINA (HTML) ----------
  const miAlcancia = new Alcancia();   // fabricamos una alcancía real

  const notas = document.getElementsByClassName("nota")
  const saldoEl = document.getElementById("saldo");
  const cantidadEl = document.getElementById("cantidad");
  const mensajeEl = document.getElementById("mensaje");
  const formato = n => "$" + n.toLocaleString("es-CO");
  const nnotas=10;

  function mostrar(texto, tipo) {
    mensajeEl.textContent = texto;
    mensajeEl.className = tipo;
  }
  function actualizar() {
    saldoEl.textContent = formato(miAlcancia.verSaldo());
    
    notas.forEach(nota => {                         // recorre cada nota
    nota.style.display = saldo > LIMITE_NOTAS ? "none" : "";
  });
  }
  
  function intentar(accion, textoOk) {
    try {
      accion(Number(cantidadEl.value));
      mostrar(textoOk, "ok");
    } catch (e) {
      mostrar("X" + e.message, "error");
    }
    
    actualizar();
  }

  document.getElementById("btnGuardar").addEventListener("click", () =>
    intentar(c => miAlcancia.guardar(c), "☑ Guardado."));
  document.getElementById("btnSacar").addEventListener("click", () =>
    intentar(c => miAlcancia.sacar(c), "☑ Retiro hecho."));

  // ---------- 3. LA TRAMPA ----------
  document.getElementById("btnTrampa").addEventListener("click", () => {
    miAlcancia.dinero = 1000000;       // crea una propiedad nueva y suelta, NO toca #dinero
    // miAlcancia.#dinero = 1000000;   // ← esto ni siquiera se puede escribir: SyntaxError
    actualizar();
    mostrar(" Lo intentaste, pero el saldo real sigue en " + formato(miAlcancia.verSaldo()) + ". El candado funcionó.", "error");
  });

  actualizar();
