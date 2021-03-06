import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Modal from '../../pages/join/modal/modal';
import CheckBox from '../input/checkbox';
import { useRouter } from 'next/router';

interface AgreeCheckboxModel {
  all: boolean;
  age: boolean;
  service: boolean;
  privacy: boolean;
  marketing: boolean;
}

const Agree = (props) => {
  const [form, setForm] = useState({
    all: false,
    age: false,
    service: false,
    privacy: false,
    marketing: false,
  });

  const [activeId, setActiveId] = useState(0);

  const [toggle, setToggle] = useState<Boolean>(false);

  const router = useRouter();
  const type = props.type as string;

  const getTermsName = () => {
    switch (type) {
      case 'service':
        return 'service';
      case 'marketing':
        return 'marketing';
      case 'personalInfo':
        return 'personalInfo';
      default:
        return '';
    }
  };
  // const getTersDetail = () => {
  //   API.terms
  //     .termsDetail({ name: getTermsName() })
  //     .then((res) => {
  //       return res;
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // useEffect(() => {
  //   getTersDetail();
  // }, []);

  const modalSwitch = () => {
    setToggle(!toggle);
  };

  const checkedHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = e.currentTarget.name;
    const checked = e.currentTarget.checked;
    setForm({
      ...form,
      [n]: checked ? true : false,
    });
  };

  const checkedAllHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;
    if (checked) {
      setForm({
        ...form,
        ['all']: true,
        ['age']: true,
        ['service']: true,
        ['privacy']: true,
        ['marketing']: true,
      });
    } else {
      setForm({
        ...form,
        ['all']: false,
        ['age']: false,
        ['service']: false,
        ['privacy']: false,
        ['marketing']: false,
      });
    }
  };

  const allcheck = () => {
    return form?.service && form?.privacy && form?.age && form?.marketing ? true : false;
  };

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div id='agree' className='join-checkbox'>
      <ul className='terms_agree'>
        <li className={`all_agree ${allcheck() ? 'on' : ''}`}>
          <label className='fs-xl fw500 agree-all' htmlFor='all'>
            ?????? ??????
          </label>
          <CheckBox checked={allcheck()} id='all' name='all' onChange={checkedAllHandler} />
        </li>
        <li>
          <label htmlFor='age'>
            <span className='required'>*</span>??? 14??? ??????
          </label>
          <CheckBox onChange={checkedHandler} checked={!!form?.age} id='age' name='age' value='age' className='reverse' />
        </li>
        <li>
          <label htmlFor='service'>
            <span className='required'>*</span>????????? ???????????? ??????
            <span className='sub_link'>
              <button onClick={modalSwitch}>
                ??????
                {toggle && <Modal modalSwitch={modalSwitch} props={props} getTermsName={getTermsName} />}
              </button>
            </span>
          </label>
          <CheckBox onChange={checkedHandler} checked={form?.service} id='service' name='service' value='service' className='reverse' />
        </li>
        <li>
          <label htmlFor='privacy'>
            <span className='required'>*</span>???????????? ?????? ?? ?????? ??????
            <span className='sub_link'>
              <button onClick={modalSwitch}>??????{toggle && <Modal modalSwitch={modalSwitch} props={props} getTermsName={getTermsName} />}</button>
            </span>
          </label>
          <CheckBox onChange={checkedHandler} checked={form?.privacy} id='privacy' name='privacy' value='privacy' className='reverse' />
        </li>
        <li>
          <label htmlFor='marketing'>
            ????????? ?????? ?????? ??????
            <span className='sub_link'>
              <button onClick={modalSwitch}>??????{toggle && <Modal modalSwitch={modalSwitch} props={props} getTermsName={getTermsName} />}</button>
            </span>
          </label>
          <CheckBox onChange={checkedHandler} checked={form?.marketing} id='marketing' name='marketing' value='marketing' className='reverse' />
        </li>
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //pageProps??? ?????? ?????????
  return { props: { type: context.query.type } };
};

export default Agree;
