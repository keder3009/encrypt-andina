import { Injectable } from '@angular/core';
import { Blowfish } from "javascript-blowfish";
import { JSEncrypt } from "JSEncrypt";
import { keys } from "./enums";

@Injectable({
  providedIn: 'root'
})
export class EncriptacionService {

  public privatekey = keys.privateKey;
  public publickey = keys.publicKey;

  constructor() { }
  
  cesar(str) {
    return str.replace(/[a-zA-Z]/gi,function(s){
      return String.fromCharCode(s.charCodeAt(0)+(s.toLowerCase()<'n'?13:-13));
    });
  }

  cifradoBlowfish(str){
    var bf = new Blowfish("andina")
    var encrypted = bf.encrypt(str)
    var decrypted = bf.decrypt(encrypted);
    decrypted = bf.trimZeros(decrypted);
    return encrypted
  }

  cifradoRsa(str){
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(this.publickey);
    var encrypted:any = encrypt.encrypt(str);
    var decrypt = new JSEncrypt();
    decrypt.setPrivateKey(this.privatekey);
    var uncrypted = decrypt.decrypt(encrypted);
    console.log(uncrypted)
    return encrypted
  }

}
