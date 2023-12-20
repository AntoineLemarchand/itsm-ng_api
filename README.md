<div align="center">
<img src="https://www.itsm-ng.org/pics/itsmng-logo.png" style="width: 500px; margin-bottom: 30px;"/>
</div>

# ITSM-ng: Backend API

The ITSM-ng Backend API aims to provide an easy way to retrieve data for creating customizable dashboard charts.

## Dependencies

- node (LTS)
- yarn

## Installation

1. Clone the repository: `git clone https://github.com/itsmng/itsm-ng_api.git`
2. Change into the project directory: `cd itsm-ng_api`
3. Install dependencies: `yarn`
4. Modify the `.env-sample` file according to your environment settings and rename it to `.env`.
5. Start the application: `yarn start`

## Usage

If your .env file is configured to use the same database as your ITSM-ng frontend, the application should work seamlessly.
An API documentation should be accessible on the route `/api`.

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## License

This project is licensed under the [GPL3 License](LICENSE).
