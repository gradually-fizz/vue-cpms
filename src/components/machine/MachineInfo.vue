<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备信息</el-breadcrumb-item>
      <el-breadcrumb-item>设备信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card>
      <el-row :gutter="25">
        <el-col :span="8">
          <el-input
            placeholder="请输入线体"
            v-model="queryInfo.lineId"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="8">
          <el-input
            placeholder="请输入设备编号"
            v-model="queryInfo.machineId"
            clearable
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="getMachineInfo">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >新增</el-button
          >
        </el-col>
      </el-row>
      <!-- 用户列表 -->
      <el-table :data="MachineInfoList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="线体名称" prop="lineId"></el-table-column>
        <el-table-column label="设备名称" prop="machineId"></el-table-column>
        <el-table-column label="站点" prop="operation"></el-table-column>
        <el-table-column label="状态" prop="state"></el-table-column>
        <el-table-column label="能力" prop="capability"></el-table-column>
        <el-table-column
          label="上游设备名称"
          prop="upMachineId"
        ></el-table-column>
        <el-table-column
          label="下游设备名称"
          prop="downMachineId"
        ></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageNum"
        :page-sizes="[5, 10, 20]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <!-- 创建新设备对话框 -->
    <el-dialog
      title="添加设备"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="线体" prop="lineId">
          <el-input v-model="addForm.lineId"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="machineId">
          <el-input v-model="addForm.machineId"></el-input>
        </el-form-item>
        <el-form-item label="站点" prop="operation">
          <el-input v-model="addForm.operation"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="addForm.state"></el-input>
        </el-form-item>
        <el-form-item label="能力" prop="capability">
          <el-input v-model="addForm.capability"></el-input>
        </el-form-item>
        <el-form-item label="上游设备" prop="upMachineId">
          <el-input v-model="addForm.upMachineId"></el-input>
        </el-form-item>
        <el-form-item label="下游设备" prop="downMachineId">
          <el-input v-model="addForm.downMachineId"></el-input>
        </el-form-item>
      </el-form>
      <!-- 内容底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMachineInfo">确 定</el-button>
      </span>
    </el-dialog>
   
    <!-- 修改设备对话框 -->
    <el-dialog
      title="修改设备信息"
      :visible.sync="editDialogVisible"
      width="50%"
      @colse="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
         <el-form-item label="线体" prop="lineId">
          <el-input v-model="addForm.lineId"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="machineId">
          <el-input v-model="addForm.machineId"></el-input>
        </el-form-item>
        <el-form-item label="站点" prop="operation">
          <el-input v-model="addForm.operation"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="addForm.state"></el-input>
        </el-form-item>
        <el-form-item label="能力" prop="capability">
          <el-input v-model="addForm.capability"></el-input>
        </el-form-item>
        <el-form-item label="上游设备" prop="upMachineId">
          <el-input v-model="addForm.upMachineId"></el-input>
        </el-form-item>
        <el-form-item label="下游设备" prop="downMachineId">
          <el-input v-model="addForm.downMachineId"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editMachineInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      MachineInfoList: [],
      queryInfo: {
        pageNum: "1",
        pageSize: "5",
        lineId: "",
        machineId: "",
      },
      total: 0,
      addDialogVisible: false,
      editDialogVisible:false,
      addForm: {
        lineId: "",
        machineId: "",
        operation: "",
        state: "",
        capability: "",
        upMachineId: "",
        downMachineId: "",
      },
      addFormRules:{},
    };
  },
  created() {
    this.getMachineInfo();
  },
  methods: {
    async getMachineInfo() {
      const { data: res } = await this.$http.get("machineinfo", {
        params: this.queryInfo,
      });
      var resObj = JSON.parse(res);
      this.MachineInfoList = resObj.data; // 将返回数据赋值
      this.total = resObj.numbers;
      console.log(this.MachineInfoList);
    },
    addMachineInfo() {},
    editMachineInfo() {},
    // 监听pageSize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getMachineInfo(); // 数据发生改变重新申请数据
    },
    // 监听pageNum改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getMachineInfo(); // 数据发生改变重新申请数据
    },
  },
};
</script>