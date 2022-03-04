import { extend } from 'vee-validate';
import { required, email, min, max } from 'vee-validate/dist/rules';

// Install required rule.
extend('required', {
    ...required,
    message: 'This field is required'
});

extend('url', {
    validate(value) {
        if(!value) return false;
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(value);
    },
    message: 'This value must be a valid URL'
});


extend('password', {
    validate(value) {
        if(!value) return false;
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)$/.test(value);
    },
    message: 'This value must be a valid password'
});

extend('email', email);
extend('min', min, { message: 'The {field} field must be at least 4 characters' });
extend('max', max, { message: 'The {field} field may not be greater than 4 characters' });
