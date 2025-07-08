import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import css from "./UserSetsModal.module.css";
import Icon from "../UI/Icon/Icon";
import Button from "../UI/Button/Button";

const UserSetsModal = ({ isOpen, onClose, userData, onUpdateUser }) => {
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [, /*avatarFile*/ setAvatarFile] = useState(null);
  const [currency, setCurrency] = useState("");
  const [name, setName] = useState("");
  const [, /*isSubmitting*/ setIsSubmitting] = useState(false);

  const modalRef = useRef();

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
    }
  };

  // const handleRemoveAvatar = async () => {
  //   try {
  //     const response = await fetch("/api/user/avatar", {
  //       method: "DELETE",
  //       credentials: "include",
  //     });
  //     if (!response.ok) {
  //       const err = await response.json();
  //       throw new Error(err.message || "Delete failed");
  //     }
  //     toast.success("Avatar removed successfully");
  //     setAvatarPreview(null);
  //     setAvatarFile(null);
  //     onUpdateUser({ avatarUrl: null });
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };

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
              type="file"
              accept="image/*"
              id="avatar-upload"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <div className={css.avatarButtonsWrapper}>
              <Button variant="dark" className={css.avatarButtons}>
                Upload new photo
              </Button>
              <Button variant="dark" className={css.avatarButtons}>
                Remove
              </Button>
            </div>
          </div>

          <div className={css.inputs}>
            <div className={css.field}>
              <label htmlFor="currency">Currency</label>
              <select
                className={css.select}
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
              <label htmlFor="name">Name</label>
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

          <Button className={css.saveButton}>Save</Button>
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
