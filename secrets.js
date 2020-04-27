const secrets = {
    dbUrl: process.env.DB_URL || 'mongodb+srv://Dansoj:dnasoj2000@tnr-6pxtq.mongodb.net/test?retryWrites=true&w=majority',
};

const getSecrets = (key) => secrets[key];

module.exports={getSecrets};
