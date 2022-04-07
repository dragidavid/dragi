import classNames from "classnames";

import { GRADIENTS } from "lib/entities";

const Contact = () => {
  return (
    <div className="flex flex-col">
      <h2 className={classNames("header", GRADIENTS.contact.class)}>Contact</h2>
    </div>
  );
};

export default Contact;
