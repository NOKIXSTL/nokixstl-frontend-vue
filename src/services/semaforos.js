import { http } from './config'

export default {
    listar: () => {
        return http.get('semaforos');
    },
    salvar: (semaforo) => {
        return http.post('semaforos',semaforo);
    }
}