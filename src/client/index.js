import { handleSubmit } from './js/app'
import './styles/style.scss'

document.getElementById('travel-form').addEventListener('submit', handleSubmit);

export {
    handleSubmit
}