import dotenv from 'dotenv';
import Web3 from 'web3';
import axios from 'axios';
dotenv.config();

const inicializateContracts = async () => {
    const web3 = new Web3(process.env.INFURA_KEY);
    let data = JSON.stringify({
        pinataOptions : {
            cidVersion : 0
        },
        pinataMetadata : {
            name: 'datos prueba',
            keyvalues : {
                rareza : 'ultra raro',
                tipo : 'S++'
            }
        },
        pinataContent : {
            archivo : 'bafybeiax6nlim5a24ydh6gtrwnshfgbukborypp66hzv2iunzlr7wor3uq',
            nombre: 'kazuha',
            nombreJuego : 'Genshin Impact',
            tipo : 'imagen',
            detalles : 'mi primer archivo json subido usando ipfs :D !',            
        }
    });
    let parsed = JSON.parse(data);
    const response = await axios({
        method:'post',
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${process.env.PINATA_JWT}`
        },
        url : process.env.PINATA_DEFAULT_URL+'/pinning/pinJSONToIPFS',
        data : parsed
    });
    console.log(response.data);
}

const main = async () => {
    inicializateContracts();
}

main();