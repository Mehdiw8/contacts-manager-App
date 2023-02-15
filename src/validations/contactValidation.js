import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  fullname: yup.string().required('نام و نام خانوادگی الزامی هست'),
  photo: yup.string().url('آدرس عکس را به درستی وارد کنید').required('عکس الزامی میباشد'),
  mobile: yup.number().required('شماره موبایل الزامی می باشد'),
  email: yup
    .string()
    .email('ایمیل را به درستی وارد کنید')
    .required('ایمیل الزامی می باشد'),
  job: yup.string().nullable(),
  group: yup.string().required('گروه را وارد کنید'),
});
