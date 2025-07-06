import { useDispatch, useSelector } from "react-redux";
import { selectModalsStack } from "../../../redux/modal/selectors";
import { closeModal } from "../../../redux/modal/slice";
import modalMap from "./modalMap";
import Backdrop from "../Backdrop/Backdrop";

/**
 * ModalRoot — глобальний рендерер стеку модальних вікон.
 *
 * Призначення:
 * Рендерить усі модалки, що зберігаються у state.modal.modals[].
 * Кожна модалка — це об’єкт з полями modalType (назва) і modalProps (додаткові дані).
 * Лише верхня модалка реагує на Escape та клік по фону (через Backdrop).
 *
 * Як відкрити модалку:
 * dispatch(openModal({ modalType: 'MyModal', modalProps: { id: 123, onClose: fn } }))
 *
 * Як закрити поточну (верхню) модалку:
 * dispatch(closeModal())
 *
 * Як додати нову модалку:
 * 1. Створи компонент, наприклад: MyModal.jsx
 * 2. Додай його до файлу modalMap.js:
 *    const modalMap = { ..., MyModal }
 *
 * Важливо:
 * - Всі модалки мають бути зареєстровані в modalMap
 * - ModalRoot має бути розміщений у SharedLayout або App (рекомендується)
 * - Додаткові пропси передаються автоматично через {...modalProps}
 */

/**
 * ModalRoot — global renderer for stacked modals.
 *
 * Purpose:
 * Renders all modals stored in state.modal.modals[].
 * Each modal is an object with modalType (name) and modalProps (custom data).
 * Only the top modal responds to Escape key and backdrop click (via Backdrop).
 *
 * How to open a modal:
 * dispatch(openModal({ modalType: 'MyModal', modalProps: { id: 123, onClose: fn } }))
 *
 * How to close the top modal:
 * dispatch(closeModal())
 *
 * How to register a new modal:
 * 1. Create a component, e.g., MyModal.jsx
 * 2. Add it to modalMap.js:
 *    const modalMap = { ..., MyModal }
 *
 * Notes:
 * - All modals must be registered in modalMap
 * - ModalRoot should be placed in SharedLayout or App (recommended)
 * - Additional props are passed via {...modalProps}
 */

const ModalRoot = () => {
  const dispatch = useDispatch();
  const modals = useSelector(selectModalsStack);

  if (modals.length === 0) return null;

  return (
    <>
      {modals.map(({ modalType, modalProps }, index) => {
        const ModalComponent = modalMap[modalType];
        const isTop = index === modals.length - 1;
        const handleClose = () => dispatch(closeModal());

        return (
          <Backdrop
            key={index}
            onClose={isTop ? handleClose : undefined}
            zIndex={1000 + index}
          >
            <ModalComponent {...modalProps} />
          </Backdrop>
        );
      })}
    </>
  );
};

export default ModalRoot;

// For block content scroll. Add in App or SharedLayout(preferable)
// const modalOpen = useSelector(hasOpenModal);

// useEffect(() => {
//   document.body.style.overflow = modalOpen ? "hidden" : "auto";
// }, [modalOpen]);
