$(document).ready(function() {

    $('#paymentForm').bootstrapValidator({
		message: 'This value is not valid',

        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
        	er: {
        		group: '.group',
        		validators: {
                    notEmpty: {
                        message: '请输入ER号'
                    },
                    regexp: {
                        regexp: /^E[0-9]{9}$/,
                        message: '请输入以E开头加9位数字编码'
                    },
                    /* regexp: {
                        regexp: /^([\u4E00-\u9FA5]|\w)*$/,
                        message: '请勿包含特殊字符'
                    }, */
                    /* stringLength: {
                        min: 1,
                        max: 12,
                        message: '请输入长度在1到12位之间的ER号'
                    }, */
                }
            },

            hr: {
            	group: '.group',
            	validators: {
                    notEmpty: {
                        message: '请输入HR号'
                    },
                    regexp: {
                        regexp: /^\d{5,12}$/,
                        message: '请输入5-12位数字编码'
                    },
                    /* regexp: {
                        regexp: /^([\u4E00-\u9FA5]|\w)*$/,
                        message: '请勿包含特殊字符'
                    }, */
                    /* stringLength: {
                        min: 1,
                        max: 12,
                        message: '请输入长度在1到12位之间的HR号'
                    }, */
                }
            },

            name: {
                group: '.group',
				validators: {
                    notEmpty: {
                        message: '请输入中文名'
                    },
                    regexp: {
                        regexp: /^([\u4E00-\u9FA5])*$/,

                        message: '请输入中文字符'

                    },
                    stringLength: {
                        max: 25,
                        message: '请输入25字以内的中文名'
                    }
                }
            },
            eName: {
                group: '.group',
				validators: {
                    notEmpty: {
                        message: '请输入英文名'
                    },
                    regexp: {
                        regexp: /^([a-zA-Z]|\s)*$/,
                        message: '请输入英文字母'
                    },
                    stringLength: {
                        max: 50,
                        message: '请输入50字符以内的英文名'
                    }
                }
            }

        }
    }).on('success.form.bv', function(e) {
            // Prevent submit form
            e.preventDefault();

            var $form     = $(e.target);
                validator = $form.data('bootstrapValidator');
            if(validator){
            	if(saveCapability==null){
            		$form.find('.alert').html('请在能力地图选择技能').show();
            	}else{
            		RegCapabilityMap(e.target);
            	}
            }

        });
});

$(function(){

	loadlevel();

	loadtype();
	
	loadBu();
	
	//loadEmpInfo();

});

window.onload = function(){
	loadEmpInfo();
}

//$("#sub_search").click(function(){
	
function loadEmpInfo(){	
	var erNumber = $("#search").val();
	$.ajax({
		url:path+"/service/employee/findEmpByEr",
		dataType:"json",
		async:true,
		data:{"erNumber":erNumber},
		cache:false,
		type:"post",
		success:function(employee){
			$("#er").val(employee.erNumber);
			$("#hr").val(employee.hrNumber);
			$("#name").val(employee.name);
			$("#ename").val(employee.eName);
			$("#emp_level").val(employee.empLevelId);
			$("#emp_type").val(employee.empTypeId);
			$("#bu").val(employee.buId);
			loadProject(employee.buId,employee.projectId);
			//$("#projectName").val(employee.projectId);
		}
	})
}	
//})


function loadlevel(){
	$.ajax({
		url:path+"/service/level/queryAll",
		dataType:"json",
		async:true,
		//data:"",
		cache:false,
		type:"post",
		success:function(listL){
			for(var i = 0;i<listL.length;i++){
				$("#emp_level").append("<option value='"+listL[i].empLevelId+"'>"+listL[i].levelName+"</option>");
			}
		}
	})
}

function loadtype(){
	$.ajax({
		url:path+'/service/type/queryAll',
		dataType:"json",
		async:true,
		//data:"",
		cache:false,
		type:"post",
		success:function(listT){
			for(var i = 0;i<listT.length;i++){
				$("#emp_type").append("<option value='"+listT[i].empTypeId+"'>"+listT[i].typeName+"</option>");
			}
		}
	})
}




function loadProject(buId,projectId){
	var buId = buId;
	$.ajax({
		url:path+'/service/project/queryAll',
		dataType:"json",
		async:true,
		data:{"buId":buId},
		cache:false,
		type:"post",
		success:function(listP){
			$("#projectName").find("option").remove(); 
			$("#projectName").append("<option value=''>-- 请选择项目 --</option>");
			for(var i = 0;i<listP.length;i++){
				$("#projectName").append("<option value='"+listP[i].projectId+"'>"+listP[i].projectName+"</option>");
			}
			if(projectId!=null){
				$("#projectName").val(projectId);
			}
		}
	})
}


function loadBu(){
	
	$.ajax({
		url:path+'/service/bu/queryBu',
		dataType:"json",
		async:true,
		cache:false,
		type:"post",
		success:function(listB){
			$("#bu").append("<option value=''>-- 请选择交付部 --</option>");
			for(var i = 0;i<listB.length;i++){
				$("#bu").append("<option value='"+listB[i].buId+"'>"+listB[i].buName+"</option>");
			}
		}
	})
	
}


