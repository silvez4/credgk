import { doc, setDoc, collection, query, where, getDocs, getFirestore, orderBy, increment } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export async function salvarCompra(data, userEmail) {
  let db = getFirestore()

  await setDoc(doc(db, "users", userEmail, 'compras', uuidv4()), data, { merge: true });

  await salvarFatura(data.valorCompra, data.valorParcelasCompra, userEmail, db)
}

export async function salvarDeposito(valorDeposito, userEmail) {
  let db = getFirestore()
  valorDeposito = valorDeposito.replaceAll(',', '.')
  valorDeposito = parseFloat(valorDeposito).toFixed(2)
  if(!isNaN(valorDeposito)){
    let deposito = {
      'valorEmConta': increment(valorDeposito) 
    }

    await setDoc(doc(db, "users", userEmail, 'conta', 'fatura'), deposito, { merge: true });
    }
    else return
}

export async function retirarDeposito(valorDeposito, userEmail) {
  let db = getFirestore()
  valorDeposito = valorDeposito.replaceAll(',', '.')
  valorDeposito = parseFloat(valorDeposito).toFixed(2)
  if(!isNaN(valorDeposito)){
    let deposito = {
      'valorEmConta': increment(-valorDeposito) 
    }

    await setDoc(doc(db, "users", userEmail, 'conta', 'fatura'), deposito, { merge: true });
  }

  else return
}

export async function salvarFatura(valorLimite, valorMes, userEmail, db) {
  valorLimite = valorLimite.replaceAll(',', '.')
  valorLimite = parseFloat(valorLimite).toFixed(2)
  valorMes = valorMes.replaceAll(',', '.')
  valorMes = parseFloat(valorMes).toFixed(2)
  let updateTime = new Date().toLocaleString("pt-BR")
  if(!isNaN(valorMes) && !isNaN(valorLimite)){
    let fatura = {
      'limiteCartao' : increment(valorLimite),
      'faturaMes' : increment(valorMes),
      'lastUpdate' : updateTime
    }
    await setDoc(doc(db, "users", userEmail, 'conta', 'fatura'), fatura, { merge: true });
  }
  else return

}

export async function pagarFatura(valorPago, userEmail) {
  let db = getFirestore()
  let updateTime = new Date().toLocaleString("pt-BR")
  let formatado = valorPago.replaceAll(',', '.')
  formatado = parseFloat(formatado).toFixed(2)
  if(!isNaN(formatado)){
    let fatura = {
      'limiteCartao' : increment(formatado),
      'faturaMes' : increment(-formatado),
      'lastUpdate' : updateTime
    }

    await setDoc(doc(db, "users", userEmail, 'conta', 'fatura'), fatura, { merge: true });
  }
  else return
}

export async function lerCompras(userEmail) {
  let result = []
  
  let db = getFirestore()
  const q = query(collection(db, "users", userEmail, "compras"), orderBy("criadoEm", "desc"));
  const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        result.push(doc.data())
      });
      console.log(result)
  return result;
}

export async function saveDeposito(data, userEmail) {
  let db = getFirestore()

  await setDoc(doc(db, "users", userEmail, 'depositos', uuidv4()), data, { merge: true });
}
