import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Row, Col, List, Avatar, Select, Input } from "antd";
import { SearchOutlined, StarOutlined, StarFilled } from "@ant-design/icons";

import { contactListAction, favContactListAction } from "../store/actions";

const { Option } = Select;
const { Search } = Input;

const ContactList = (props) => {
  const [searchText, setSearchText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  useEffect(() => {
    console.log(props.favContacts);
    props.contactListAction().then((contactDetails) => {
      setContacts(contactDetails.contacts.data);
    });
  }, []);

  const handleChange = (value) => {
    if (value) {
        debugger;
      let sortedArr = contacts.sort(function (a, b) {
        return a.first_name.localeCompare(b.first_name) || a.last_name.localeCompare(b.last_name);
      });
      if (value === "ZTOA") {
          let reversedArr = sortedArr.reverse();
          setContacts(reversedArr);
      } else {
        setContacts(sortedArr);
      }
    }
  };

  const saveToFavContacts = (details) => {
    props.favContactListAction(details).then(() => {
      contacts.map((val, index) => {
        if (val.id === details.id) {
          val.isFav = true;
          setContacts([...contacts, val]);
        }
      });
    });
  };

  const removeFromFavContacts = (details) => {
    //
  };

  const goToDetailsPage = () => {
    // props.history.push('/contact-details');
  };

  return (
    <div className="wrapper">
      <Row gutter={24}>
        <Col span={24}>
          <div className="nav">
            <h1>Contact List</h1>
            <div className="nav-actions">
              <Link to="/favs">Favourite Contacts</Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <div className="inner-nav">
            <Select
              bordered={false}
              placeholder="All"
              allowClear={true}
              style={{ width: 80 }}
              onChange={handleChange}
            >
              <Option value="ATOZ">A-Z</Option>
              <Option value="ZTOA">Z-A</Option>
            </Select>
            <div className="nav-actions">
              {!showSearchBar && (
                <SearchOutlined
                  style={{ fontSize: "28px", color: "white" }}
                  onClick={(e) => setShowSearchBar(true)}
                />
              )}
              {showSearchBar && (
                <Search
                  placeholder="Search contacts here."
                  onSearch={(e) => setSearchText(e)}
                  enterButton
                  allowClear
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <List
            itemLayout="vertical"
            size="large"
            className="contact-list"
            pagination={{
              pageSize: 3,
            }}
            dataSource={contacts.filter(
              (li) =>
                li.first_name.indexOf(searchText) !== -1 ||
                li.last_name.indexOf(searchText) !== -1
            )}
            renderItem={(item, index) => (
              <List.Item onClick={goToDetailsPage()}>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={item.first_name + " " + item.last_name}
                  description={item.email}
                />
                <div className="help-text">
                  {item.isFav && (
                    <StarFilled
                      onClick={(e) => removeFromFavContacts(item)}
                      style={{ fontSize: "28px", color: "#ffa651" }}
                    />
                  )}
                  {/* <span>{`10:${index < 10 ? '0' + index : index} PM`}</span> */}
                  <StarOutlined
                    onClick={(e) => saveToFavContacts(item)}
                    style={{ fontSize: "28px", color: "#ffa651" }}
                  />
                </div>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
    favContacts: state.favContacts,
  };
};

const mapDispatchToProps = {
  contactListAction,
  favContactListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
