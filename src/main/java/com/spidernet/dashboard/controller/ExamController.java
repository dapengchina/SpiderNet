package com.spidernet.dashboard.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.spidernet.dashboard.entity.CapabilityExam;
import com.spidernet.dashboard.entity.Employee;
import com.spidernet.dashboard.entity.Exam;
import com.spidernet.dashboard.entity.ExamCapability;
import com.spidernet.dashboard.service.CapabilityExamService;
import com.spidernet.dashboard.service.ExamService;
import com.spidernet.util.Utils;

@Controller
@RequestMapping("/exam")
public class ExamController
{
    @Resource
    ExamService examService;
    
    @Resource
    CapabilityExamService capabilityExamService;

    private static Logger logger = LoggerFactory
            .getLogger(ExamController.class);

    @RequestMapping("/personalExamList")
    @ResponseBody
    public Object examList(final HttpServletRequest request,
            final HttpServletResponse response)
    {
        String capabilityId = request.getParameter("capabilityId");
        String employeeId = ((Employee)request.getSession().getAttribute("employee")).getEmployeeId();
        String projectId = ((Employee)request.getSession().getAttribute("employee")).getProjectId();
        String buId = ((Employee)request.getSession().getAttribute("employee")).getBuId();

        List<ExamCapability> examList = examService.fetchAllExam(capabilityId, employeeId,projectId,buId);

        return examList;
    }
    
    
    @RequestMapping("/queryExamByName")
    @ResponseBody
    public Object queryExamByName(final HttpServletRequest request,
            final HttpServletResponse response)
    {
        String examName = request.getParameter("examName");
        
        List<Exam> examList = examService.queryExamByName(examName);
        
        return examList;
    }
    
    
    @RequestMapping("/queryExamName")
    @ResponseBody
    public Object queryExamName(final HttpServletRequest request,
            final HttpServletResponse response)
    {
        List<Exam> examList = examService.queryExamName();
        
        return examList;
    }
    
    @RequestMapping("/addExam")
    @ResponseBody
    public Boolean addExam(final HttpServletRequest request,
            final HttpServletResponse response)
    {
        String examId = Utils.getUUID();
        String buId = request.getParameter("buId");
        String projetId = request.getParameter("projectId");
        String name = request.getParameter("examName");
        String startTime = request.getParameter("startTime");
        String endTime = request.getParameter("endTime");
        String description = request.getParameter("description");
        String examTime = request.getParameter("examTime");
        //int validPeriod = Integer.parseInt(request.getParameter("validPeriod"));
        String skillPoints = request.getParameter("skillPoints");
        String status = "0";
        
        Exam exam = new Exam();
        
        exam.setExamId(examId);
        exam.setBuId(buId);
        exam.setProjetId(projetId);
        exam.setName(name);
        exam.setStartTime(startTime);
        exam.setEndTime(endTime);
        exam.setDescription(description);
        exam.setExamTime(examTime);
        //exam.setValidPeriod(validPeriod);
        exam.setStatus(status);
        
        CapabilityExam capabilityExam = new CapabilityExam();
        
        capabilityExam.setCapabilityId(skillPoints);
        capabilityExam.setExamId(examId);
        
        boolean resultFlag = examService.addExam(exam);
        
        boolean resultFlags = capabilityExamService.addCapabilityExam(capabilityExam);
        
        return (resultFlag && resultFlags);
    }
    

}
