export const name_validation = {
  name: 'username',
  label: 'Nama Lengkap',
  type: 'text',
  id: 'name',
  placeholder: 'Nama Mahasiswa',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: 'Maksimal 30 karakter',
    },
    
  },
}

export const desc_validation = {
  name: 'description',
  label: 'description',
  multiline: true,
  id: 'description',
  placeholder: 'write description ...',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 200,
      message: 'Maksimal 200 karakter',
    },
  },
}

export const password_validation = {
  name: 'password',
  label: 'password',
  type: 'password',
  id: 'password',
  placeholder: '******',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'Minimal 6 karakter',
    },
  },

}

export const nim_validation = {
  name: 'nim',
  label: 'nim',
  type: 'text',
  id: 'nim',
  placeholder: '1234567890',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 10,
      message: 'NIM tidak valid',
    },
    pattern: {
      value: /^[0-9]+$/,
      message: 'NIM tidak valid',
    }
  },
}

export const email_validation = {
  name: 'email',
  label: 'email address',
  type: 'email',
  id: 'email',
  placeholder: 'example@mail.com',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'not valid',
    },
  },
}