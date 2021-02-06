import axios from "axios";
import { env } from "../constants";

let apis = {
  auth:{
      login(data,onSuccess,onError){
          axios.post(env.server + 'auth/login',data).then((res) => {
            onSuccess(res.data)
          }).catch(err => {
              onError(err)
          })
      },
      register(data,onSuccess,onError){
        axios.post(env.server + 'auth/register',data).then((res) => {
            onSuccess(res.data)
          }).catch(err => {
              onError(err)
          })
      },
      auth(token,onSuccess,onError) {
        axios
        .get(env.server + "auth/auth", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
      },
      update(data,onSuccess,onError){
        axios.post(env.server + 'auth/update',data).then((res) => {
            onSuccess(res.data)
          }).catch(err => {
              onError(err)
          })
      },
  },
  cvs:{
    store(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/store',data).then((res) => {
        onSuccess(res.data)
      }).catch(err => {
          onError(err)
      })
    },
    update(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/update',data).then((res) => {
        onSuccess(res.data)
      }).catch(err => {
          onError(err)
      })
    },
    updateTemplateID(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/update_template_id/' + data.ID,data).then((res) => {
        onSuccess(res.data)
      }).catch(err => {
          onError(err)
      })
    },
    searchInCv(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/search_cv',data).then((res) => {
        onSuccess(res.data)
      }).catch(err => {
          onError(err)
      })
    },
    storeBasicInformations(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/basics_information/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    updateBasicInformations(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/basics_information/update',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    storeEducations(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/educations/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    deleteEducations(id,onSuccess,onError) {
      axios.get(env.server + 'cvs/educations/delete/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    storeSkills(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/skills/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    deleteSkills(id,onSuccess,onError) {
      axios.get(env.server + 'cvs/skills/delete/' +id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    storeSummary(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/summary/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    updateSummary(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/summary/update',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    storeCertifications(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/certifications/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    deleteCertifications(id,onSuccess,onError) {
      axios.get(env.server + 'cvs/certifications/delete/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    storeWorkExperiences(data,onSuccess,onError) {
      axios.post(env.server + 'cvs/work_experience/store',data).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    deleteWorkExperiences(id,onSuccess,onError) {
      axios.get(env.server + 'cvs/work_experience/delete/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    }
  },
  main:{
    index(token,onSuccess,onError){
      axios
        .get(env.server + "main/index", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => onSuccess(res.data))
        .catch((err) => onError(err));
    },
    GenerateCV(id,onSuccess,onError) {
      axios.get(env.server + 'main/generate_cv/' + id).then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    },
    indexWithoutAuth(onSuccess,onError) {
      axios.get(env.server + 'main/index/without_auth').then(res => {
        onSuccess(res.data)
      }).catch(err => {
        onError(err)
      })
    }
  }
};

export default apis;
