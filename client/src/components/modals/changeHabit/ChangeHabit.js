import React from 'react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../formik/FormikControl'
import s from './ChangeHabit.module.css';
import styles from '../addHabit/AddHabit.module.css';
import modalBackDrop from '../../modalBackDrop/ModalBackDrop';
import habitOperations from '../../../redux/habit/habitOperations';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderSmall } from '../../UIcomponents/LoaderSmall/LoaderSmall';

const ChangeHabit = ({ close, data }) => {
  const dispatch = useDispatch();
  const children = useSelector(state => state.children.userChildrens);
  const loaderHabit = useSelector(state => state.habits.loaderHabit);
  const errorHabit = useSelector(state => state.habits.errorHabit);


  const initialOptions = [{ key: 'Виберіть дитину', value: '' }]

  const dropdownOptions = children.length > 0 &&
    initialOptions.concat(children.map(child => {
      let name = child.name;
      let dbId = child._id;
      return { key: name, value: dbId }
    }))


  const initialValues = {
    name: data.name,
    childId: data.childId,
    points: data.points
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Обов'язкове поле").min(4, "Мінімальна довжина: 4 символи"),
    childId: Yup.string().required('Оберіть один з варіантів'),
    points: Yup.string()
      .required("Обов'язкове поле")
      .matches(/[0-9]$/i, 'Введіть  число',),
  });


  const onSubmit = async values => {
    console.log('Request data', values)
    console.log(data._id);
    const result = await dispatch(
      habitOperations.updateHabit(values, data._id)
    );
    if (result) {
      close();
    }
  }

  const handleDelete = () => {
    dispatch(habitOperations.deleteHabit(data._id));
    close();
  };

  return (
    <div className={styles.modalBody}>
      <h2 className={styles.title}>Редагування звички</h2>
      <div className={styles.form}>
        <div className={styles.inputBlock}>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {formik => (
              <Form>
                <FormikControl
                  control='input'
                  type='string'
                  label='Назва'
                  name='name'
                />
                <FormikControl
                  control='select'
                  label='Призначення звички'
                  name='childId'
                  options={dropdownOptions}
                />
                <FormikControl
                  control='pointsInput'
                  type='string'
                  label='Бал'
                  name='points'
                />

                <button
                  type="button"
                  className={s.btnDelete}
                  onClick={() => handleDelete()}
                >
                  <span className={s.btnDeleteIcon}></span> Видалити задачу
                </button>

                <div className={styles.buttonsBlock}>
                  <button className={styles.buttonSave} type='submit'>
                    {!loaderHabit && <span>Зберегти</span>}
                    {loaderHabit && <LoaderSmall />}
                  </button>

                  <button className={styles.buttonCancle} onClick={() => close()}>
                    Відміна
                   </button>
                </div>
                {errorHabit && <span>Ops ... err={errorHabit}</span>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <button
        onClick={() => close()}
        className={styles.modalCloseBtn}
      ></button>
    </div>
  )
};

export default modalBackDrop(ChangeHabit);
