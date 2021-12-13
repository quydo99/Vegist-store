import React, { useEffect, useState } from 'react';
import { Radio } from 'antd';
import PaymentBreadcrumb from './component/PaymentBreadcrumb';
import { useTranslation } from 'react-i18next';
import { getBill, getCartData, createBill } from '../../../redux/actions';
import { connect } from 'react-redux';
import history from '../../../until/history';
import { TiWarningOutline } from 'react-icons/ti';
import { MdPayment } from 'react-icons/md';
import 'moment/locale/vi';
import './styles.scss';

const Payment = ({ getBill, billData, createBill, getCartData }) => {
  const { t } = useTranslation();
  const [billingAddress, setBillingAddress] = useState(1);
  const [infoPayment, setInfoPayment] = useState(JSON.parse(localStorage.getItem('infoPayment')));

  const handelCreateBill = async () => {
    await createBill({
      payment: 'Trực tiếp',
      name: infoPayment.name,
      address: infoPayment.address,
      phoneNumber: infoPayment.phone,
    });

    localStorage.removeItem('infoPayment');
    getCartData();
  };

  return (
    <div className="payment-page fadeIn">
      <div className="container payment__container">
        <section className="payments">
          <h1 className="information__title">vegina-store</h1>
          <PaymentBreadcrumb />
          <div className="shipping__info shipping__content">
            <div className=" shipping__content--item   ">
              <div className="shipping__info--inner">
                <h4>{t('Phone')}</h4>
                <p>{infoPayment.phone}</p>
              </div>
              <button className="button" onClick={() => history.push('/infoPayment')}>
                {t('payments.shipping.Change')}
              </button>
            </div>
            {infoPayment.email && (
              <div className=" shipping__content--item   ">
                <div className="shipping__info--inner">
                  <h4>{t('Email')}</h4>
                  <p>{infoPayment.email}</p>
                </div>
                <button className="button" onClick={() => history.push('/infoPayment')}>
                  {t('payments.shipping.Change')}
                </button>
              </div>
            )}
            <div className=" shipping__content--item">
              <div className="shipping__info--inner">
                <h4>{t('payments.shipping.Ship to')}</h4>
                <p>{infoPayment.address}</p>
              </div>
              <button className="button" onClick={() => history.push('/infoPayment')}>
                {t('payments.shipping.Change')}
              </button>
            </div>
            <div className=" shipping__content--item">
              <div className="shipping__info--inner">
                <h4>{t('Name')}</h4>
                <p>{infoPayment.name}</p>
              </div>
              <button className="button" onClick={() => history.push('/infoPayment')}>
                {t('payments.shipping.Change')}
              </button>
            </div>
          </div>
          <div className="shipping__title">
            <h2>{t('payments.payment.Payment')}</h2>
            <p>{t('payments.payment.All transactions are secure and encrypted')}</p>
          </div>
          <div className="payments__warning shipping__content">
            <div className="shipping__info--inner payments__warning--inner">
              <TiWarningOutline />
              <p>{t('payments.payment.This store can only pay with COD')}</p>
            </div>
          </div>
          <div className="payments__content">
            <div className="payments__item">
              <Radio disabled>{t('payments.payment.Credit card')}</Radio>
              <MdPayment />
            </div>
            <div className="payments__item">
              <Radio checked>{t('payments.payment.Cash on Delivery (COD)')}</Radio>
            </div>
          </div>
          {/* <div className="shipping__title">
            <h2>{t('payments.payment.Billing address')}</h2>
            <p>
              {t('payments.payment.Select the address that matches your card or payment method.')}
            </p>
          </div>
          <div className="payments__content">
            <Radio.Group
              onChange={(e) => setBillingAddress(e.target.value)}
              value={billingAddress}
              style={{ width: '100%' }}
            >
              <div className="payments__item">
                <Radio value="Same as shipping address" onClick={(e) => setBillingAddress(e)}>
                  {t('payments.payment.Same as shipping address')}
                </Radio>
              </div>
              <div className="payments__item">
                <Radio
                  value="Use a different billing address"
                  onClick={(e) => setBillingAddress(e)}
                >
                  {t('payments.payment.Use a different billing address')}
                </Radio>
              </div>
            </Radio.Group>
          </div> */}
          <div className="shipping__btn">
            <button
              className="button  button-animation--1 button-round--lg "
              onClick={() => handelCreateBill()}
            >
              <span> {t('payments.payment.Complete order')}</span>
            </button>
            <button
              className="button button-round button-transparent"
              onClick={() => history.push('/shipping')}
            >
              <span> {t('payments.payment.Return to shipping')}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { billData, billInitData } = state.paymentReducer;

  return { billData, billInitData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBill: (params) => dispatch(getBill(params)),
    createBill: (params) => dispatch(createBill(params)),
    getCartData: (params) => dispatch(getCartData(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Payment);
