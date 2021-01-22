import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ChangePresent.module.css';
import Button from '../../UIcomponents/Button/Button';
import { BasicInput } from '../../UIcomponents/Input/BasicInput';
import { CustomSelect } from '../../UIcomponents/CustomSelect/CustomSelect';
import modalBackDrop from '../../modalBackDrop/ModalBackDrop';
import { MarkInput } from '../../UIcomponents/MarkInput/MarkInput';
import { updateGift, deleteGift } from '../../../redux/gifts/giftOperations';

function ChangePresent({ close, data }) {
  const { _id, imageUrl } = data;
  const dispatch = useDispatch();
  const children = useSelector(state => state.children.userChildrens);
  const loaderGift = useSelector(state => state.gifts.loaderGift);
  const errorGift = useSelector(state => state.gifts.errorGift);
  const [presentTitle, setPresentTitle] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [childId, setChildId] = useState(data.childId);
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileError, setFileError] = useState('');

  const fileInput = React.createRef();

  const handleTitleChange = event => {
    setPresentTitle(event.target.value);
  };

  const handleNameChange = event => {
    setChildId(event.target.value);
  };
  const handlePriceChange = event => {
    setPrice(event.target.value);
  };
  const handleFileChange = () => {
    const imgFile = fileInput.current.files[0];
    const reader = new FileReader();

    if (imgFile) {
      if (imgFile.size > 16777000) {
        setFileError('Файл завеликий');
        return;
      }
      setFileError('');
      setFileName(imgFile.name);
      reader.readAsDataURL(imgFile);
      reader.onloadend = function () {
        setFile(imgFile);
      };
    }
  };

  const resetState = () => {
    setPresentTitle('');
    setChildId('Оберіть дитину');
    setPrice('');
    setFile('');
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', presentTitle);
    formData.append('price', price);
    formData.append('childId', childId);
    formData.append('imageURL', imageUrl);
    if (file) {
      formData.append('image', file, fileName);
    }
    const result = await dispatch(updateGift(formData, _id));
    if (result) {
      resetState();
      close();
    }
  };

  const handleDelete = () => {
    dispatch(deleteGift(_id));
    close();
  };

  return (
    <div className={styles.ModalBody}>
      <div className={styles.FormWrap}>
        <h3 className={styles.Title}>Редагування подарунку</h3>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className={styles.InputsWrapper}>
            <BasicInput
              forLabel={'presentTitle'}
              id={'presentTitle'}
              labelText={'Назва'}
              value={presentTitle}
              name="presentTitle"
              handleChange={handleTitleChange}
              placeholder={'Введіть назву'}
              type="text"
            />
            <CustomSelect
              id={'childId'}
              name={'childId'}
              labelText={'Призначення подарунку'}
              handleChange={handleNameChange}
              value={childId}
              options={children}
            />
            <MarkInput value={price} onChange={handlePriceChange} />
            <div>
              <span className={styles.FileInputTitle}>
                Завантажити фото (необов’язково)
              </span>
              <label htmlFor="file" className={styles.FileInputLabel}>
                {fileError ? fileError : file ? fileName : 'Оберіть файл'}

                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  id="file"
                  ref={fileInput}
                  onChange={handleFileChange}
                  className={styles.FileInput}
                />
              </label>
            </div>
            <button
              type="button"
              className={styles.btnDelete}
              onClick={handleDelete}
            >
              <span className={styles.btnDeleteIcon}></span> Видалити подарунок
            </button>
          </div>
          <div className={styles.ButtonsBlock}>
            <Button
              type="button"
              handleClick={close}
              label={'Відміна'}
              bordered={true}
            />
            <Button
              type="submit"
              label={'Зберегти'}
              orange={true}
              disabled={!presentTitle || childId === 'Оберіть дитину'}
              loading={loaderGift}
            />
          </div>
          {errorGift && <span>Ops ... err={errorGift}</span>}
        </form>
        <button onClick={close} className={styles.ModalCloseBtn}></button>
      </div>
    </div>
  );
}
export default modalBackDrop(ChangePresent);
