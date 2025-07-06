/**
 * modalMap — об'єкт відповідності між назвою модального вікна (modalType)
 * та відповідним React-компонентом, який потрібно відрендерити.
 *
 * Використовується в ModalRoot для динамічного рендерингу модалок зі стеку.
 *
 * Як додати нову модалку:
 * 1. Створи або імпортуй компонент, наприклад:
 *    import MyModal from '../modals/MyModal';
 * 2. Додай його у об'єкт нижче з унікальним ключем:
 *    const modalMap = {
 *      ...,
 *      MyModal
 *    };
 *
 * Важливо:
 * - Ключ повинен відповідати полю `modalType` при виклику openModal()
 * - Не додавай функції або обгортки — лише компоненти
 */

/**
 * modalMap — maps modalType string keys to corresponding React components.
 *
 * Used inside ModalRoot to dynamically render modals from the stack.
 *
 * How to register a new modal:
 * 1. Import your component:
 *    import MyModal from '../modals/MyModal';
 * 2. Add it to the map:
 *    const modalMap = {
 *      ...,
 *      MyModal
 *    };
 *
 * Notes:
 * - The key must match the modalType used when calling openModal()
 * - Only pass components — no functions or wrappers
 */

const modalMap = {
  // ModalContentOne,
  // ModalContentTwo,
  // add other modals
};

export default modalMap;
