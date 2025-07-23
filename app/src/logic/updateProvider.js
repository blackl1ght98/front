import { SystemError, validate } from "com";
import { data } from "../data";

export const updateProvider = (targetId, name, contact, address, providerId) => {
  validate.userId(targetId);
  validate.name(name);
  validate.address(address);
  validate.contact(contact);
  validate.providerId(providerId);

  return fetch(`${import.meta.env.VITE_API_URL}providers/${targetId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${data.getToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address, contact, providerId }),
  })
    .catch(() => {
      throw new SystemError("connection error");
    })
    .then((response) => {
      const { status } = response;
      if (status === 200) return;
      return response
        .json()
        .catch(() => {
          throw new SystemError("JSON parsing error");
        })
        .then((body) => {
          const { error, message } = body;

          const constructor = error[error] || SystemError;

          throw new constructor(message);
        });
    });
};
