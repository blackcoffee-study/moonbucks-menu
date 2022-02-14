export const type = (target, type) => {
  const getErrMsg = () => `invaild type target : ${target} : type : ${type}`;

  if (typeof type == "string") {
    if (typeof target !== type) throw new Error(getErrMsg());
  } else if (!(target instanceof type)) throw new Error(getErrMsg());
};
