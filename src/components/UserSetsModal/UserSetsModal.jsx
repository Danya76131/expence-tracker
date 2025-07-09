import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import css from "./UserSetsModal.module.css";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button/Button";
import CloseButton from "./CloseButton";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAvatar,
  userAvatarChange,
} from "../../redux/user/operations";
import { ShowErrorToast, ShowSuccessToast } from "../CustomToast/CustomToast";
import toast from "react-hot-toast";
import { selectUserAvatar } from "../../redux/user/selectors";

const UserSetsModal = ({ isOpen, onClose, userData, onUpdateUser }) => {
  const dispatch = useDispatch();
  const userAvatar = useSelector(selectUserAvatar);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [currency, setCurrency] = useState("");
  const [name, setName] = useState("");
  const [, /*isSubmitting*/ setIsSubmitting] = useState(false);

  const modalRef = useRef();
  const uploadFotoInput = useRef();

  useEffect(() => {
    if (isOpen) {
      setAvatarPreview(userData.avatarUrl || null);
      setAvatarFile(null);
      setCurrency(userData.currency || "");
      setName(userData.name || "");
    }
  }, [isOpen, userData]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      console.log(file);
    }
  };
  console.log(avatarFile);
  console.log(avatarPreview);

  const handleRemoveAvatar = async () => {
    try {
      await dispatch(deleteUserAvatar()).unwrap();

      toast.custom(<ShowSuccessToast msg={"Photo succesfuly removed"} />);
      setAvatarPreview(null);
      setAvatarFile(null);
      onUpdateUser({ avatarUrl: null });
    } catch {
      toast.custom(<ShowErrorToast msg={"Something went wrong"} />);
    }
  };

  const handleUploadAvatar = (ref) => {
    const input = ref.current;
    if (input) input.click();
  };

  const handleFetchFoto = async () => {
    if (!avatarPreview) return;
    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);
      await dispatch(userAvatarChange(formData)).unwrap();
      toast.custom(<ShowSuccessToast msg={"Photo succesfuly added"} />);
    } catch {
      toast.custom(<ShowErrorToast msg={"Something went wrong"} />);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/user", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, currency }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Update failed");
      }
      const updatedUser = await response.json();
      toast.success("User data updated");
      onUpdateUser(updatedUser);
      onClose();
    } catch (error) {
      toast.error(error.message);
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
            {userAvatar ? (
              <img
                src={userAvatar}
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
                type=""
                variant="dark"
                className={css.avatarButtons}
                onClick={() => handleUploadAvatar(uploadFotoInput)}
              >
                Upload new photo
              </Button>
              <Button
                variant="dark"
                className={css.avatarButtons}
                onClick={handleRemoveAvatar}
              >
                Remove
              </Button>
            </div>
          </div>

          <div className={css.inputs}>
            <div className={css.field}>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={30}
              />
            </div>
          </div>

          <Button className={css.saveButton} onClick={handleFetchFoto}>
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
