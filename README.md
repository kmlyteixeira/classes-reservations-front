### classes-reservation-frontend
this repository is reserved for developing the frontend of the classes reservation project.

### :eyes: __Overview__
![image](https://github.com/user-attachments/assets/ebaea7b2-5134-4799-b164-7839a4261665)

### :hammer: Build w/
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Ant-Design](https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white)


### :runner: Installing and Running

You can integrate this project with: 

[Faculdade-Senac-Joinville/classes_reservation](https://github.com/Faculdade-Senac-Joinville/classes_reservation)

[Faculdade-Senac-Joinville/classes_reservation_queue_service](https://github.com/Faculdade-Senac-Joinville/classes_reservation_queue_service)

1.  Clone this repo `https://github.com/Faculdade-Senac-Joinville/classes-reservation-front`
4.  Run `npm install` to install the dependencies 
5.  Run `npm build` to build project and create `.next` folder
6.  Run `npm start`
7.  Open `http://localhost:3000` and be happy! :)

### Here you'll find:

```
classes-reservations-front
|
├── src
│   ├── app
|   |   ├── dashboard
|   |   ├── home
|   |   ├── login
|   |   ├── records
|   |   ├── reports
|   |   ├── reservations
|   |   ├── layout.tsx
|   |   ├── loading.tsx
|   |   └── page.tsx
|   |
|   ├── commons
|   |   ├── hooks
|   |   ├── modal
|   |   └── services
|   |
|   ├── components
|   |   ├── approval-modal-content
|   |   ├── auth
|   |   ├── calendar
|   |   ├── card
|   |   ├── card-list
|   |   ├── drawer
|   |   ├── form
|   |   ├── layouts
|   |   ├── modal
|   |   ├── notifications-popover
|   |   ├── recurrence-checkbox
|   |   ├── recurrence-modal-content
|   |   ├── reservation-drawer
|   |   ├── AppQueryClientProvider.tsx
|   |   └── StyledComponentsRegistry.tsx
|   |
|   ├── interfaces
|   |   ├── classes
|   |   ├── notifications
|   |   ├── profiles
|   |   ├── reservations
|   |   └── users
|   |
|   ├── services
|   |   ├── auth
|   |   ├── classes
|   |   ├── notifications
|   |   ├── reservations
|   |   ├── shared
|   |   └── users
|   |
│   └── shared
|       ├── format-date.ts
|       └── sanitize-data.ts
|
├── .env
├── .eslintrc.json
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```
