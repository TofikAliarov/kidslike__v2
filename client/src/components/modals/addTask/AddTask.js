import React from 'react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../formik/FormikControl'

import styles from '../addHabit/AddHabit.module.css';
import modalBackDrop from '../../modalBackDrop/ModalBackDrop';
import operations from '../../../redux/tasks/taskOperations';
import { useDispatch, useSelector } from 'react-redux';
import { LoaderSmall } from '../../UIcomponents/LoaderSmall/LoaderSmall';

const AddTask = ({ close }) => {
  const dispatch = useDispatch();
  const children = useSelector(state => state.children.userChildrens);
  const loaderTask = useSelector(state => state.tasks.loaderTask);
  const errorTask = useSelector(state => state.tasks.errorTask);


  const initialOptions = [{ key: 'Виберіть дитину', value: '' }]

  const dropdownOptions = children.length > 0 &&
    initialOptions.concat(children.map(child => {
      let name = child.name;
      let dbId = child._id;
      return { key: name, value: dbId }
    }))


  const initialValues = {
    name: '',
    childId: '',
    points: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Обов'язкове поле").min(4, "Мінімальна довжина: 4 символи"),
    childId: Yup.string().required('Оберіть один з варіантів'),
    points: Yup.string()
      .required("Обов'язкове поле")
      .matches(/[0-9]$/i, 'Введіть  число',),
    daysToComplete: Yup.number()
  });

  const onSubmit = async values => {
    console.log('Request data', values)
    const result = await dispatch(
      operations.addTask(values),
    );
    if (result) {
      close();
    }
  }

  return (
      <div className={styles.modalBody}>
        <h2 className={styles.title}>Додавання задачі</h2>
        <div className={styles.form} onSubmit={onSubmit}>
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
                  label='Призначення задачі'
                  name='childId'
                  options={dropdownOptions}
                />
                <FormikControl
                  control='pointsInput'
                  type='string'
                  label='Бал'
                  name='points'
                />
                <FormikControl
                  control='daysInput'
                  type='string'
                  label='Дні на виконання (необов’язково)'
                  name='daysToComplete'
                />
                <div className={styles.buttonsBlock}>
                  <button className={styles.buttonSave} type='submit'>
                    {!loaderTask && <span>Зберегти</span>}
                    {loaderTask && <LoaderSmall />}
                  </button>
                  <button className={styles.buttonCancle} onClick={() => close()}>
                      Відміна
             </button>
                </div>
                {errorTask && <span>Ops ... err={errorTask}</span>}
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

export default modalBackDrop(AddTask);
