import classNames from "classnames";

import { GRADIENTS } from "lib/entities";

const Contact = () => {
  return (
    <div className="flex h-full flex-col">
      <h2 className={classNames("header", GRADIENTS.contact.class)}>Contact</h2>

      <p>Drop me an email or check out my resume.</p>
    </div>
  );
};

export default Contact;
