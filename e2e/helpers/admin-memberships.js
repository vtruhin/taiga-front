var utils = require('../utils');

var helper = module.exports;

helper.openNewMemberLightbox = function() {
    $('.header-with-actions .button-green').click();
};

helper.getNewMemberLightbox = function() {
    let el = $('div[tg-lb-add-members]');

    let obj = {
        el: el,
        waitOpen: function() {
            return utils.lightbox.open(el);
        },
        waitClose: function() {
            return utils.lightbox.close(el);
        },
        newEmail: function(email) {
            el.$$('input').last().sendKeys(email);
            el.$('.add-fieldset').click();
        },
        getRows: function() {
            return el.$$('.add-single-member');
        },
        deleteRow: function(index) {
            el.$$('.remove-fieldset').get(index).click();
        },
        submit: function() {
            return el.$('.submit-button').click();
        }
    };

    return obj;
};

helper.leavingProjectWarningLb = function() {
    return $('div[tg-lightbox-leave-project-warning]');
};

helper.isLeaveProjectWarningOpen = function() {
    return helper.leavingProjectWarningLb().isPresent();
};

helper.getMembers = function() {
    return $$('.admin-membership-table .row');
};

helper.getOwner = function() {
    return helper.getMembers().filter(async (member) => {
        return  !!await member.$$('.owner-badge').count();
    }).first();
};

helper.excludeOwner = function(members) {
    return members.filter(async (member) => {
        return !await member.$$('.icon-badge').count();
    });
};

helper.isActive = function(elm) {
    return utils.common.hasClass(elm, 'active');
};

helper.delete = function(elm) {
    elm.$('.delete').click();
};

helper.isAdmin = async function(elm) {
    let isAdmin = await elm.$('.row-admin input').getAttribute('checked');

    return (isAdmin === 'true');
};

helper.toggleAdmin = function(elm) {
    return elm.$('.row-admin input').click();
};

helper.setRole = function(elm, index) {
    return elm.$(`select option:nth-child(${index})`).click();
};

helper.sendInvitation = function(elm) {
    elm.$('.resend').click();
};
