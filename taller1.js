
class Cuenta {
    numero
    titular
    #saldo

    constructor(numero, titular, saldo) {
        if (saldo < 0) {
            throw new Error("El saldo no puede ser negativo")
        }

        this.numero = numero
        this.titular = titular
        this.#saldo = saldo
    }

    getSaldo() {
        return this.#saldo
    }

    consignar(valor) {
        if (valor > 0) {
            this.#saldo += valor
            console.log("Consignacion realizada correctamente")
        } else {
            console.log("El valor debe ser mayor que cero")
        }
    }

    retirar(valor) {
        if (valor > 0 && valor <= this.#saldo) {
            this.#saldo -= valor
            console.log("Retiro realizado correctamente")
        } else {
            console.log("Saldo insuficiente o valor incorrecto")
        }
    }

    descontar(valor, sobregiro) {
        if (valor > 0 && valor <= this.#saldo + sobregiro) {
            this.#saldo -= valor
            console.log("Retiro realizado correctamente")
        } else {
            console.log("No se puede realizar el retiro")
        }
    }
}

class CuentaAhorros extends Cuenta {
    constructor(numero, titular, saldo) {
        super(numero, titular, saldo)
    }

    retirar(valor) {
        console.log("Retiro de cuenta de ahorros")
        super.retirar(valor)
    }
}

class CuentaCorriente extends Cuenta {
    constructor(numero, titular, saldo) {
        super(numero, titular, saldo)
    }

    retirar(valor) {
        console.log("Retiro de cuenta corriente")
        this.descontar(valor, 100000)
    }
}

let cuentas = []

function registrarCuenta(cuenta) {
    let repetida = cuentas.some(c => c.numero === cuenta.numero)

    if (repetida) {
        console.log("cuenta ya resgistrada")
    } else {
        cuentas.push(cuenta)
        console.log("Cuenta registrada ")
    }
}

function buscarCuenta(numero) {
    let encontrada = cuentas.find(c => c.numero === numero)

    if (encontrada) {
        console.log("Numero:", encontrada.numero)
        console.log("Titular:", encontrada.titular)
        console.log("Saldo:", encontrada.getSaldo())
    } else {
        console.log("La cuenta no existe")
    }
}

let cuenta1 = new CuentaAhorros("001", "Carlos", 500000)
let cuenta2 = new CuentaCorriente("002", "Maria", 300000)

  registrarCuenta(cuenta1)
  registrarCuenta(cuenta2)
   registrarCuenta(cuenta1)

cuenta1.consignar(100000)
cuenta1.consignar(0)
cuenta1.retirar(50000)
cuenta1.retirar(900000)

 cuenta2.retirar(350000)
cuenta2.retirar(200000)

buscarCuenta("001")
buscarCuenta("003")

console.log("Listado de todas las cuentas")

cuentas.forEach(cuenta => {
    console.log(cuenta.numero, cuenta.titular, cuenta.getSaldo())
}
       )
