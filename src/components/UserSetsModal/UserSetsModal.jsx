import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button/Button";
import CloseButton from "./CloseButton";
import { ShowErrorToast, ShowSuccessToast } from "../CustomToast/CustomToast";
import {
  deleteUserAvatar,
  updateUser,
  userAvatarChange,
} from "../../redux/user/operations";
import { selectUserAvatar } from "../../redux/user/selectors";
import css from "./UserSetsModal.module.css";

const UserSetsModal = ({ isOpen, onClose, userData, onUpdateUser }) => {
  const dispatch = useDispatch();
  const userAvatar = useSelector(selectUserAvatar);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [currencyState, setCurrencyState] = useState("");
  const [nameState, setNameState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalRef = useRef();
  const uploadFotoInput = useRef();
  const selectRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setAvatarPreview(userAvatar || null);
      setAvatarFile(null);
      setNameState(userData.name || "");
    }
  }, [isOpen, userData, userAvatar]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));

      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append("avatar", file);
        const res = await dispatch(userAvatarChange(formData)).unwrap();

        toast.custom(<ShowSuccessToast msg={"Photo uploaded successfully!"} />);
        onUpdateUser(res);
      } catch {
        setAvatarPreview(userAvatar || null);
        setAvatarFile(null);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleUploadAvatar = (ref) => {
    const input = ref.current;
    if (input) input.click();
  };

  const handleRemoveAvatar = async () => {
    setIsSubmitting(true);
    try {
      await dispatch(deleteUserAvatar()).unwrap();
      toast.custom(<ShowSuccessToast msg={"Photo succesfuly removed"} />);
      setAvatarPreview(null);
      setAvatarFile(null);
      onUpdateUser({ avatarUrl: null });
    } catch {
      toast.custom(<ShowErrorToast msg={"Failed to remove photo"} />);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updates = {};
    if (nameState !== userData.name) {
      updates.name = nameState;
    }

    const c = selectRef.current.value;

    updates.currency = c.toLowerCase();

    if (Object.keys(updates).length === 0) {
      onClose();
      setIsSubmitting(false);
      return;
    }

    try {
      const updatedUser = await dispatch(updateUser(updates)).unwrap();
      toast.custom(<ShowSuccessToast msg="Changes successfully saved!" />);
      onUpdateUser(updatedUser);
      onClose();
    } catch {
      toast.custom(
        <ShowErrorToast msg={"Something went wrong. Try again later"} />
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={css["modal-backdrop"]}
      ref={modalRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css["wrapper"]}>
        <CloseButton onClick={onClose} />
        <h2>Profile settings</h2>
        <form onSubmit={handleSubmit}>
          <div className={`${css.field} ${css["avatar-field"]}`}>
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="User avatar preview"
                className={css["avatar-preview"]}
              />
            ) : (
              <div className={css.userAvatarWrapper}>
                <Icon name="user-avatar" size={38} fill="#0EF387" />
              </div>
            )}

            <input
              ref={uploadFotoInput}
              type="file"
              accept="image/*"
              id="avatar-upload"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <div className={css.avatarButtonsWrapper}>
              <Button
                type="button"
                variant="dark"
                className={css.avatarButtons}
                onClick={() => handleUploadAvatar(uploadFotoInput)}
                disabled={isSubmitting}
              >
                Upload new photo
              </Button>
              <Button
                type="button"
                variant="dark"
                className={css.avatarButtons}
                onClick={handleRemoveAvatar}
                disabled={!avatarPreview || isSubmitting}
              >
                Remove
              </Button>
            </div>
          </div>

          <div className={css.inputs}>
            <div className={css.field}>
              <select
                ref={selectRef}
                id="currency"
                value={currencyState}
                onChange={(e) => setCurrencyState(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="UAH">₴ UAH</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>

            <div className={css.field}>
              <input
                id="name"
                type="text"
                value={nameState}
                onChange={(e) => setNameState(e.target.value)}
                required
                minLength={2}
                maxLength={30}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <Button
            type="submit"
            className={css.saveButton}
            disabled={isSubmitting}
          >
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

UserSetsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userData: PropTypes.shape({
    avatarUrl: PropTypes.string,
    currency: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onUpdateUser: PropTypes.func.isRequired,
};

export default UserSetsModal;
